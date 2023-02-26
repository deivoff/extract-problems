type Action<T, P = never> = P extends never ? {
  type: T
} : {
  type: T;
  payload: P;
}