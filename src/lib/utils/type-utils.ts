/* tslint:disable:ban-types */
export type MethodNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
export type Methods<T> = Pick<T, MethodNames<T>>;

export type PropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
export type Properties<T> = Pick<T, PropertyNames<T>>;
