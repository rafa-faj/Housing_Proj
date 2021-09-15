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

/**
 * Use as a type for component props.
 */
export type Props = {
  [key: string]: any;
};

/**
 * generics to transform values in an array to union types
 */
export type ArrayUnionTransform<
  T extends ReadonlyArray<unknown>
> = T extends ReadonlyArray<infer Type> ? Type : never;

/**
 * generics to map all values of a const array to a particular type
 *
 */
export type TransformArray<
  ArrayType extends ReadonlyArray<string | number | symbol>,
  ElementType
> = {
  [P in ArrayUnionTransform<ArrayType>]: ElementType;
};
