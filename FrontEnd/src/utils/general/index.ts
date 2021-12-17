/**
 * Use to remove parentheses and everything inside the parentheses
 */
export const removeParentheses = (str: string): string => {
  return str.replace(/ *\([^)]*\) */g, '');
};

/**
 * { ...object1, ...object2 }, but for many objects.
 */
export const joinObjects = <T extends {}>(...objects: T[]) =>
  objects.reduce((prev, cur) => ({ ...prev, ...cur }), {});

/**
 * runNTimes will run a function `n` times. The function will be provided with
 * a number `i` that represents the how many times the function has been run
 * (starting from `0` and increasing until `n - 1`)
 */
export const runNTimes = (n: number, f: (i: number) => any) =>
  Array.from({ length: n }, (_, i) => i).map(f);
