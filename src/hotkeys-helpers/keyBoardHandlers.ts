import { KeyboardEvent as ReactKeyboardEvent } from 'react';

const getCMD = (evt: ReactKeyboardEvent | KeyboardEvent): CommandCode =>
  // eslint-disable-next-line no-bitwise
  (evt.ctrlKey ? 1 : 0) |
  (evt.altKey ? 2 : 0) |
  (evt.shiftKey ? 4 : 0) |
  (evt.metaKey ? 8 : 0);

type CommandCode = number;
export type CommandHandler = (cmd: CommandCode) => boolean;
/**
 * either CTRL or META key without SHIFT.
 * */
export const ctrl: CommandHandler = (cmd) => cmd === 1 || cmd === 8;
/**
 * either CTRL or META key with optional SHIFT.
 * */
export const ctrlOptionalShift: CommandHandler = (cmd) =>
  ctrl(cmd) || cmd === 5 || cmd === 12;
/**
 * No control key pressed at all.
 * */
export const noKey: CommandHandler = (cmd) => cmd === 0;

// check if it's input or select or something editable
export const isEditableElement = <T extends EventTarget>(
  el: (T & ({ form?: HTMLFormElement | null } | undefined)) | null,
) => Boolean(el?.form || el?.form === null);

export type Options = {
  command?: CommandHandler;
  customEventKey?: string;
  preventOnEditable?: boolean;
};

/**
 * Possible codes:
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_code_values MDN Web Docs}
 * */
export type KeyCode = KeyboardEvent['code'];

export function handleKeyPress(
  keys: KeyCode[] | KeyCode,
  callback: () => void,
  { command = noKey, preventOnEditable = false, customEventKey }: Options = {},
) {
  return (event: ReactKeyboardEvent | KeyboardEvent) => {
    if (preventOnEditable && isEditableElement(event.target)) return false;

    const cmd = getCMD(event);
    const targetKeys = Array.isArray(keys) ? keys : [keys];
    if (!(command(cmd) && targetKeys.includes(event.code))) return false;
    event.preventDefault();
    if ('stopImmediatePropagation' in event) {
      event.stopImmediatePropagation();
    } else {
      event.stopPropagation();
    }
    if (customEventKey) {
      document.dispatchEvent(new CustomEvent(customEventKey));
    }

    callback();
    return true;
  };
}
