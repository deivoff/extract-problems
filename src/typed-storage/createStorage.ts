type ValueType<StorageValue> = StorageValue extends
  | Record<string, unknown>
  | Record<string, unknown>[]
  ? 'json'
  : StorageValue extends boolean
  ? 'boolean'
  : 'string';

interface TypedStorage<StorageInterface> {
  getItem: <Key extends keyof StorageInterface>(
    key: Key,
  ) => StorageInterface[Key] | undefined;
  setItem: <Key extends keyof StorageInterface>(
    key: Key,
    value: StorageInterface[Key],
  ) => void;
  removeItem: <Key extends keyof StorageInterface>(key: Key) => void;
  clear: () => void;
}

type OmitByValue<T, V> = Omit<
  T,
  { [Key in keyof T]-?: T[Key] extends V ? Key : never }[keyof T]
>;

type ReaderConfig<StorageInterface> = {
  [Key in keyof StorageInterface]: ValueType<StorageInterface[Key]>;
};

export const isServer = () => {
  return typeof window === 'undefined';
};

const jsonReader = {
  getter: (v: string | null) => {
    if (!v) return undefined;
    try {
      return (JSON.parse(v) as unknown) ?? undefined;
    } catch (e) {
      return undefined;
    }
  },
  setter: JSON.stringify,
};

const booleanReader = {
  getter: (v: string | null) => v === 'true',
  setter: (v: boolean) => String(v),
};

const defaultReader = {
  getter: (v: string | null) => v ?? undefined,
  setter: (v: string) => v,
};

const getReader = (type?: 'string' | 'json' | 'boolean') => {
  switch (type) {
    case 'json':
      return jsonReader;
    case 'boolean':
      return booleanReader;
    default:
      return defaultReader;
  }
};

export function createStorage<StorageInterface>(
  storage: Storage | undefined,
  config: OmitByValue<ReaderConfig<StorageInterface>, 'string'>,
): TypedStorage<StorageInterface> {
  if (!storage)
    return {
      getItem: () => undefined,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
    };

  return {
    getItem: <Key extends keyof StorageInterface>(key: Key) => {
      const { getter } = getReader(config[key]);

      return getter(storage.getItem(key as string)) as
        | StorageInterface[Key]
        | undefined;
    },
    setItem: (key, value) => {
      const { setter } = getReader(config[key]);

      storage.setItem(key as string, setter(value));
    },
    removeItem: (key) => storage.removeItem(key as string),
    clear: () => storage.clear(),
  };
}
