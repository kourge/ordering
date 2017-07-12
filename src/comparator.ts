import {Scoring, scoringFromArray, scoringFromArrayByMap} from './scoring';

/**
 * A `Comparator<T>` can compare two items of type `T`. A return value of 0
 * means the two items are equal, a value lesser than 0 means `a` is lesser
 * than `b`, and a value greater than 0 means `a` is great than `b`.
 */
export interface Comparator<T> {
  (a: T, b: T): number;
}

/**
 * Joins zero or more existing comparators so that when a comparison results in
 * equality, the next one is used as a fallback. If no comparators are given,
 * the resulting comparator considers every comparison as equal.
 */
// tslint:disable-next-line:array-type
export function join<T>(...comparators: Comparator<T>[]): Comparator<T> {
  switch (comparators.length) {
    case 0:
      return alwaysEqual;
    case 1:
      return comparators[0];
    default:
      return function joinedComparator(a: T, b: T): number {
        const lastIndex = comparators.length - 1;
        const last = comparators[lastIndex];
        const rest = comparators.slice(0, lastIndex);

        for (const compare of rest) {
          const result = compare(a, b);
          if (result !== 0) {
            return result;
          }
        }

        return last(a, b);
      };
  }
}

/**
 * Becomes `scoringFromArrayByMap` if `Map` is available from the environment.
 * Otherwise falls back to `scoringFromArray`.
 */
const makeScoring = (() => {
  try {
    // tslint:disable-next-line:no-unused-expression
    Map;
    return scoringFromArrayByMap;
  } catch (_) {
    return scoringFromArray;
  }
})();

/**
 * Generates a `Comparator<T>` given a scoring function `Scoring<T>`.
 * Alternatively an array can be given instead, in which case a scoring function
 * is generated automatically. This is very useful for any sort of enum-like
 * type, where a limited subset of strings and / or numbers are used for special
 * meaning. In the scenario where an unknown value is compared against, it is
 * treated as the lowest possible value, i.e. unknown values are given the score
 * of -1.
 *
 * A generated scoring function is guaranteed to have at least linear
 * efficiency, but in an environment where ECMAScript 6 `Map`s are supported,
 * the efficiency may become sublinear.
 * @param scoring An array denoting the desired order of ranking, or a custom
 * scoring function
 */
export function ranking<T>(scoring: T[] | Scoring<T>): Comparator<T> {
  const scoreOf = scoring instanceof Function ? scoring : makeScoring(scoring);

  return function rankingComparator(a: T, b: T): number {
    return scoreOf(a) - scoreOf(b);
  };
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
