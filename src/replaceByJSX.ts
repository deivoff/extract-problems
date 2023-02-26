import { ReactNode } from 'react';
import escapeRegExp from 'lodash/escapeRegExp';
import flatten from 'lodash/flatten';
import isRegExp from 'lodash/isRegExp';
import isString from 'lodash/isString';

type Match = string | RegExp;
type Replacer = (match: string, index: number, offset: number) => ReactNode;
type Source = string | ReactNode[];

const replaceString = (str: ReactNode, match: Match, fn: Replacer) => {
  let curCharStart = 0;
  let curCharLen = 0;

  if (str === '') {
    return str;
  }
  if (!str || !isString(str)) {
    throw new TypeError(
      'First argument to react-string-replace#replaceString must be a string',
    );
  }

  const regex = isRegExp(match)
    ? match
    : new RegExp(`(${escapeRegExp(match)})`, 'gi');

  const result = str.split(regex);

  // Apply fn to all odd elements
  for (let i = 1, { length } = result; i < length; i += 2) {
    curCharLen = result[i].length;
    curCharStart += result[i - 1].length;
    result[i] = fn(result[i], i, curCharStart) as string;
    curCharStart += curCharLen;
  }

  return result as unknown as JSX.Element[];
};

/**
 * Forked from {@link https://github.com/iansinnott/react-string-replace react-string-replace}
 *
 * Given a string, replace every substring that is matched by the `match` regex
 * with the result of calling `fn` on matched substring. The result will be an
 * array with all odd indexed elements containing the replacements. The primary
 * use case is similar to using String.prototype.replace except for React.
 *
 * React will happily render an array as children of a react element, which
 * makes this approach very useful for tasks like surrounding certain text
 * within a string with react elements.
 *
 * @example
 * replaceByJSX(
 *   'Emphasize all phone numbers like 884-555-4443.',
 *   /([\d|-]+)/g,
 *   (number, i) => <strong key={i}>{number}</strong>
 * );
 * // returns ['Emphasize all phone numbers like ', <strong>884-555-4443</strong>, '.'
 *
 * @param {Source} source
 * @param {Match} match Must contain a matching group
 * @param {Replacer} fn
 * @return {JSX.Element[]}
 */
export const replaceByJSX = (
  source: Source,
  match: Match,
  fn: Replacer,
): JSX.Element[] => {
  const arrSource = Array.isArray(source) ? source : [source];

  return flatten(
    arrSource.map((x) => {
      return isString(x) ? replaceString(x, match, fn) : x;
    }),
  ) as JSX.Element[];
};
