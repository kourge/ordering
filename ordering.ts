/**
 * Defines the {@linkcode Ordering} class that wraps around a
 * {@linkcode Comparator} and provides convenience methods.
 * @packageDocumentation
 */

import {Comparator, reversed, join, keyed} from './comparator';

/**
 * An ordering is a wrapper around a {@linkcode Comparator} that makes it easy
 * to create more comparators based on the wrapped one.
 *
 * To make an ordering, call {@linkcode ordering} with a comparator. To
 * retrieve the comparator from an ordering, access its `compare` property.
 *
 * @example
 * ```ts
 * const numericOrdering = ordering(byNumber);
 * numericOrdering.compare === byNumber;
 * ```
 */
export class Ordering<Element> {
  constructor(
    /**
     * The underlying comparator that drives this ordering.
     */
    public compare: Comparator<Element>,
  ) {}

  /**
   * Returns an ordering that is a reversal of the current one.
   *
   * @example
   * ```ts
   * const byNumberDescending = ordering(byNumber).reverse().compare;
   *
   * const a = [1, 10, 3, 8, 5, 6, 7, 4, 9, 2, 0];
   * a.sort(byNumberDescending);
   * ```
   */
  reversed(): Ordering<Element> {
    const result = ordering<Element>(reversed(this.compare));

    // Cache the current ordering as the reverse of the reversed ordering.
    result.reversed = () => this;

    return result;
  }

  /**
   * Joins the given comparators or orderings into a new ordering so that when
   * this ordering's comparison results in an equality, the next one is used as
   * a fallback.
   *
   * @example
   * ```ts
   * const orderingByName = ordering(byString).on<Person>(p => p.name);
   * const orderingByAge = ordering(byNumber).on<Person>(p => p.age);
   *
   * const orderingByNameThenByAge = orderingByName.join(orderingByAge);
   * ```
   */
  join(
    ...comparatorsOrOrderings: Array<Comparator<Element> | Ordering<Element>>
  ): Ordering<Element> {
    if (comparatorsOrOrderings.length === 0) {
      return this;
    }

    const comparators = comparatorsOrOrderings.map(toComparator);
    return ordering<Element>(join(this.compare, ...comparators));
  }

  /**
   * Derives an `Ordering<T>` out of the current `Ordering<Element>` given a
   * transformation function from `T` to `Element`.
   *
   * A common use case is to compare objects based on a specific property, given
   * an existing comparator that already knows how to compare the type of that
   * property.
   *
   * @example
   * ```ts
   * interface Person {
   *   name: string;
   *   age: number;
   * }
   * const byName = ordering(byString).on<Person>(p => p.name).compare;
   * const byAge = ordering(byNumber).on<Person>(p => p.age).compare;
   * ```
   */
  on<T>(f: (data: T) => Element): Ordering<T> {
    return ordering<T>(keyed(f, this.compare));
  }
}

/**
 * Wraps the given comparator in an {@linkcode Ordering}.
 */
export function ordering<Element>(
  compare: Comparator<Element>,
): Ordering<Element> {
  return new Ordering<Element>(compare);
}

function toComparator<Element>(
  f: Ordering<Element> | Comparator<Element>,
): Comparator<Element> {
  return 'compare' in f ? f.compare : f;
}
