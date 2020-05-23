/**
 * Defines the {@linkcode Comparator} interface, as well as providing various
 * convenience functions for creating comparators out of data or other existing
 * comparators.
 * @packageDocumentation
 */
import {Scoring, scoringFromArray, scoringFromArrayByMap} from './scoring';

/**
 * A [comparator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description)
 * is a function that takes two elements of the same type and returns a number
 * that indicates the comparison result.
 *
 * @returns
 * - `0` or `-0` if the two elements are considered equal.
 * - Any number greater than `0` if the first element is greater than the second
 *   one.
 * - Any number lesser than `0` if the first is lesser than the second.
 */
export interface Comparator<Element> {
  (a: Element, b: Element): number;
}

/**
 * Joins one or more existing comparators into a new comparator so that when a
 * comparison results in equality, the next one is used as a fallback.
 *
 * @throws {`TypeError`} if no comparators are given
 *
 * @example
 * ```ts
 * const byName = (person1, person2) => byString(person1.name, person2.name);
 * const byAge = (person1, person2) => byNumber(person1.age, person2.age);
 *
 * const byNameThenByAge = join(byName, byAge);
 * ```
 */
export function join<Element>(
  ...comparators: Comparator<Element>[]
): Comparator<Element> {
  switch (comparators.length) {
    case 0:
      throw new TypeError('`join` must be given at least one comparator.');
    case 1:
      return comparators[0];
    default:
      const result = function joinedComparator(a: Element, b: Element): number {
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

      const names = comparators.map(nameOfFunction).join(', ');
      Object.defineProperty?.(result, 'name', {
        value: `joinedComparator(${names})`,
      });

      return result;
  }
}

/**
 * Creates a reversed version of the given comparator.
 *
 * @example
 * ```ts
 * const byNumberDescending = reversed(byNumber);
 * ```
 */
export function reversed<Element>(
  comparator: Comparator<Element>,
): Comparator<Element> {
  const result = function reversedComparator(a: Element, b: Element): number {
    return -comparator(a, b);
  };

  Object.defineProperty?.(result, 'name', {
    value: `reversed(${nameOfFunction(comparator)})`,
  });

  return result;
}

/**
 * Creates a comparator that compares two elements based on their keys.
 *
 * The `keyOf` function is called repeatedly throughout the sorting process, so
 * make sure that it is efficient. If it is computationally costly to calculate
 * the key of an element, consider using a `Map` or a `WeakMap` to cache a key
 * once it is calculated.
 *
 * @param keyOf a function that calculates the key of an element
 * @param keyComparator a comparator that can compare keys returned by `keyOf`
 *
 * @example
 * ```ts
 * interface Person {
 *   name: string;
 *   age: number;
 * }
 *
 * const byAge = keyed((person: Person) => person.age, byNumber);
 * ```
 */
export function keyed<Element, Property>(
  keyOf: (element: Element) => Property,
  keyComparator: Comparator<Property>,
): Comparator<Element> {
  const result = function keyedComparator(a: Element, b: Element): number {
    return keyComparator(keyOf(a), keyOf(b));
  };

  return result;
}

/**
 * Becomes `scoringFromArrayByMap` if `Map` is available from the environment.
 * Otherwise falls back to `scoringFromArray`.
 */
const makeScoring = (() => {
  try {
    Map;
    return scoringFromArrayByMap;
  } catch (_) {
    return scoringFromArray;
  }
})();

/**
 * Generates a {@linkcode Comparator} given an array of ordered elements or a
 * scoring function {@linkcode Scoring}. This is useful for any sort of
 * enum-like type, where a limited subset of strings and / or numbers are used
 * for special meaning.
 *
 * When given an array, a scoring function is generated to look up from that
 * array. This lookup process is at least linear, but becomes more efficient if
 * a good implementation of `Map` is available in the environment. If the lookup
 * fails because an unknown element not in the array was given, then it is given
 * the lowest possible score of -1.
 *
 * @param scoring An array denoting the desired order of ranking, or a custom
 * scoring function
 *
 * @example
 * ```ts
 * const byVowelCount = ranking<string>(word => word.match(/[aeiou]/gi).length);
 *
 * enum Rarity {
 *   Common,
 *   Uncommon,
 *   Rare,
 *   Legendary,
 *   Exotic,
 * }
 *
 * const byRarity = ranking<Rarity>([
 *   Rarity.Common,
 *   Rarity.Uncommon,
 *   Rarity.Rare,
 *   Rarity.Legendary,
 *   Rarity.Exotic,
 * ]);
 * ```
 */
export function ranking<Element>(
  scoring: Element[] | Scoring<Element>,
): Comparator<Element> {
  const scoreOf = scoring instanceof Function ? scoring : makeScoring(scoring);

  return function rankingComparator(a: Element, b: Element): number {
    return scoreOf(a) - scoreOf(b);
  };
}

function nameOfFunction(f: Function & {displayName?: string}): string {
  return f?.displayName ?? f.name;
}
