/**
 * Provides ready-to-use comparators for sorting most JavaScript built-in types.
 * @packageDocumentation
 */

/**
 * Compares numbers.
 *
 * @example
 * ```ts
 * const a = [6, 3, 2, 8, 7, 6, 9, 4, 3, 8];
 * a.sort(byNumber);
 * // => [2, 3, 3, 4, 6, 6, 7, 8, 8, 9]
 * ```
 */
export function byNumber(a: number, b: number): number {
  return a - b;
}

/**
 * Compares strings lexicographically according to the current locale's
 * collation.
 *
 * @example
 * ```ts
 * const a = [
 *   'tove', 'wave', 'borogove', 'rath', 'jabberwock', 'jubjub', 'bandersnatch',
 *   'tumtum', 'tulgey'
 * ];
 * a.sort(byString);
 * // => [
 * //   'bandersnatch', 'borogove', 'jabberwock', 'jubjub', 'rath', 'tove',
 * //   'tulgey', 'tumtum', 'wave'
 * // ]
 * ```
 */
export function byString(a: string, b: string): number {
  return a.localeCompare(b);
}

/**
 * Compares strings lexicographically according to the current locale's
 * collation, but does so while ignoring case as defined by the current locale.
 *
 * @example
 * ```ts
 * const a = ['Variks', 'judgment', 'Mithrax', 'light', 'Eramis', 'ship']
 * a.sort(byStringWithoutCaseSensitivity);
 * // => ['Eramis', 'judgment', 'light', 'Mithrax', 'ship', 'Variks']
 * ```
 */
export function byStringWithoutCaseSensitivity(a: string, b: string): number {
  return a.localeCompare(b, undefined, {sensitivity: 'base'});
}

/**
 * Compares strings by code unit order. This is especially useful when
 * serializing unordered data (e.g. a map or a plain object) to disk, since it
 * enforces predictable ordering and can mitigate merge conflicts to a certain
 * degree.
 *
 * Refer to section 7.2.11 of the ECMAScript Language Specification (6th Edition
 * / June 2015) for more details.
 */
export function byCodeUnit(a: string, b: string): number {
  return a === b ? 0 : a > b ? 1 : -1;
}

/**
 * Compares dates by chronological order. An earlier date is considered smaller
 * than a later one.
 *
 * @example
 * ```ts
 * const today = new Date();
 * const yesterday = new Date(+today - 86400000);
 * const tomorrow = new Date(+today + 86400000);
 * const a = [tomorrow, yesterday, today];
 * a.sort(byDate);
 * // => [yesterday, today, tomorrow]
 * ```
 */
export function byDate(a: Date, b: Date): number {
  return +a - +b;
}

/**
 * Compares booleans by truthiness. Falsehood is considered smaller than truth.
 *
 * @example
 * ```ts
 * const a = [true, false, true];
 * a.sort(byBoolean);
 * // => [false, true, true]
 * ```
 */
export function byBoolean(a: boolean, b: boolean): number {
  return +a - +b;
}
