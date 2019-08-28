export type Properties<T> = {
  // tslint:disable-next-line:ban-types
  [K in keyof T]: T[K] extends Function ? never : T[K];
};
