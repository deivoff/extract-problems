import React, { ComponentType, createContext, FC, useContext } from 'react';

// Selector can extract any value
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Selector<Value> = (value: Value) => any;

type SelectorHooks<Selectors> = {
  [K in keyof Selectors]: () => Selectors[K] extends (...args: any[]) => infer R
    ? R
    : never;
};

type Hooks<
  Value,
  Selectors extends Selector<Value>[],
> = Selectors['length'] extends 0 ? [() => Value] : SelectorHooks<Selectors>;

type ContextHOCTuple<Value, Selectors extends Selector<Value>[]> = [
  // Component can have any props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <P extends Record<string, any>>(
    Component: ComponentType<P>,
  ) => (props: P) => JSX.Element,
  ...Hooks<Value, Selectors>,
];

type ContextProviderTuple<Value, Selectors extends Selector<Value>[]> = [
  FC,
  ...Hooks<Value, Selectors>,
];
type ContextProviderTupleWithProps<
  Value,
  Selectors extends Selector<Value>[],
  ProviderProps,
> = [FC<ProviderProps>, ...Hooks<Value, Selectors>];

type ContextAndHooks<Value, Selectors extends Selector<Value>[]> = [
  React.Context<Value>,
  Hooks<Value, Selectors>,
];

const createContextAndHooks = <Value, Selectors extends Selector<Value>[]>(
  // Context can have any state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useContextState: Record<string, any>,
  selectors: Selectors,
  initialState: Value,
): ContextAndHooks<Value, Selectors> => {
  const Context = createContext(initialState);
  if (useContextState?.name) {
    Context.displayName = useContextState.name.substring(3);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const hooks: Hooks<Value, Selectors> = selectors.length
    ? selectors.map((selector) => () => selector(useContext(Context)))
    : [() => useContext(Context)];
  return [Context, hooks];
};

export function createContextHOC<Value, Selectors extends Selector<Value>[]>(
  useContextState: () => Value,
  initialValue: Value,
  ...selectors: Selectors
): ContextHOCTuple<Value, Selectors> {
  const [Context, hooks] = createContextAndHooks(
    useContextState,
    selectors,
    initialValue,
  );

  const withContext =
    <P extends Record<string, unknown>>(Component: ComponentType<P>) =>
    (props: P) => {
      const contextState = useContextState();

      return (
        <Context.Provider value={contextState}>
          <Component {...props} />
        </Context.Provider>
      );
    };

  return [withContext, ...hooks];
}

export function createContextProvider<
  Value,
  Selectors extends Selector<Value>[],
  ProviderProps,
>(
  useContextState: (providerProps: ProviderProps) => Value,
  initialValue: Value,
  ...selectors: Selectors
): ContextProviderTupleWithProps<Value, Selectors, ProviderProps>;
export function createContextProvider<
  Value,
  Selectors extends Selector<Value>[],
>(
  useContextState: () => Value,
  initialValue: Value,
  ...selectors: Selectors
): ContextProviderTuple<Value, Selectors>;
export function createContextProvider(
  useContextState: (value: Record<string, unknown>) => unknown,
  initialValue: unknown,
  ...selectors: any[]
) {
  const [Context, hooks] = createContextAndHooks(
    useContextState,
    selectors,
    initialValue,
  );
  const Provider: FC = ({ children, ...providerProps }) => {
    const contextState = useContextState(providerProps);

    return <Context.Provider value={contextState}>{children}</Context.Provider>;
  };

  return [Provider, ...hooks];
}
