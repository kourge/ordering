/**
 * Compares numbers.
 */
export function byNumber(a: number, b: number): number {
  return a - b;
}

/**
 * Compares strings lexicographically according to the current locale's
 * collation.
 */
export function byString(a: string, b: string): number {
  return a.localeCompare(b);
}

export namespace byString {
  /**
   * Compares strings lexicographically according to the current locale's
   * collation, but does so while ignoring case as defined by the current
   * locale.
   */
  export function caseInsensitive(a: string, b: string): number {
    return a.localeCompare(b, 'en-US', {sensitivity: 'base'});
  }
}

/**
 * Compares strings by code unit order. This is especially useful when
 * serializing unordered data (e.g. a map or a plain object) to disk, since it
 * adds predictable ordering and can mitigate merge conflicts to a certain
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
 */
export function byDate(a: Date, b: Date): number {
  return +a - +b;
}

/**
 * Compares booleans by truthiness. Falsehood is considered smaller than truth.
 */
export function byBoolean(a: boolean, b: boolean): number {
  return +a - +b;
}
