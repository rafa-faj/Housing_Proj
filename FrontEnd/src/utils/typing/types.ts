/**
 * Use to define validation checks for an object T.
 */
export type ObjectValidationChecks<T> = {
  [key in keyof T]: (value: T[key]) => boolean;
};

/**
 * Use as a type for "one of the variables from P".
 */
export type OneFrom<P> = { [K in keyof P]: Pick<P, K> };
