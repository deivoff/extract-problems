import { createStorage, isServer } from './createStorage';

interface TypedLocalStorage {
  booleanValue: boolean;
  value: string;
  objectValue: {
    foo: number;
    bar: boolean;
  };
}

export const LocalTypedStorage = createStorage<TypedLocalStorage>(
  // eslint-disable-next-line no-restricted-properties
  isServer() ? undefined : window.localStorage,
  {
    booleanValue: 'boolean',
    objectValue: 'json'
  },
);
