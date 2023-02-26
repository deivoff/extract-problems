import { createStorage, isServer } from './createStorage';


interface TypedSessionStorage {
  booleanValue: boolean;
  value: string;
  objectValue: {
    foo: number;
    bar: boolean;
  };
}

export const SessionTypedStorage = createStorage<TypedSessionStorage>(
  // eslint-disable-next-line no-restricted-properties
  isServer() ? undefined : window.sessionStorage,
  {
    booleanValue: 'boolean',
    objectValue: 'json'
  },
);
