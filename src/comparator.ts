/**
 * A `Comparator<T>` can compare two items of type `T`. A return value of 0
 * means the two items are equal, a value lesser than 0 means `a` is lesser
 * than `b`, and a value greater than 0 means `a` is great than `b`.
 */
export interface Comparator<T> {
  (a: T, b: T): number;
}

/**
 * A comparator that reports every comparison as equal.
 */
export function alwaysEqual<T>(a: T, b: T): number {
  return 0;
}

/**
 * A comparator that compares numbers.
 */
export function byNumber(a: number, b: number): number {
  return a - b;
}

/**
 * A comparator that compares strings lexicographically according to the
 * current locale's collation.
 */
export function byString(a: string, b: string): number {
  return a.localeCompare(b);
}

export namespace byString {
  /**
   * A comparator that compares strings lexicographically according to the
   * current locale's collation, but does so while ignoring case as defined by
   * the current locale.
   */
  export function caseInsensitive(a: string, b: string): number {
    return a.localeCompare(b, 'en-US', {sensitivity: 'base'});
  }
}

/**
 * A comparator that compares dates by chronological order. An earlier date is
 * considered smaller than a later one.
 */
export function byDate(a: Date, b: Date): number {
  return +a - +b;
}

/**
 * A comparator that compares booleans by truth. Falsehood is considered
 * smaller than truth.
 */
export function byBoolean(a: boolean, b: boolean): number {
  return +a - +b;
}
