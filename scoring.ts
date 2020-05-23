/**
 * Defines the {@linkcode Scoring} interface, a simpler alternative to the
 * {@linkcode Comparator} interface.
 * @packageDocumentation
 */

/**
 * A scoring function `Scoring<Element>` offers a simpler alternative to a
 * {@linkcode Comparator}. Instead of comparing two different elements, a
 * scoring function instead takes an element and produces a numeric score. These
 * scores are then used to sort compare elements against each other. This is
 * achieved by using the {@linkcode ranking} function to create a
 * {@linkcode Comparator} out of a scoring function.
 *
 * A scoring function is called repeatedly throughout the sorting process, so
 * make sure that it is efficient. If it is computationally costly to calculate
 * the score of an element, consider using a `Map` or a `WeakMap` to cache a
 * score once it is calculated.
 */
export interface Scoring<Element> {
  (data: Element): number;
}

/**
 * Generates a {@linkcode Scoring} function from the given array, whose order is
 * used to produce the numeric score. The efficiency of the result scoring
 * function is linear.
 *
 * The array should contain all possible values under type `Element`, but in the
 * scenario that the scoring function is called with an unknown value absent
 * from the array, -1 is returned.
 *
 * Equality comparison is performed with the `===`, with the exception that
 * `NaN` is considered equal to itself.
 */
export function scoringFromArray<Element>(order: Element[]): Scoring<Element> {
  return function scoring(data: Element): number {
    if (data !== data) {
      // Handle isNaN(data) specifically.
      const {length} = order;
      for (let i = 0; i < length; i++) {
        const v = order[i];
        if (v !== v) {
          return i;
        }
      }

      return -1;
    }

    return order.indexOf(data);
  };
}

/**
 * Generates a {@linkcode Scoring} function from the given array, whose order is
 * used to produce the numeric score. The efficiency of the result scoring
 * function is sublinear, but relies on the environment to provide a good
 * implementation of `Map`.
 *
 * The array should contain all possible values under type `Element`, but in the
 * scenario that the scoring function is called with an unknown value absent
 * from the array, -1 is returned.
 *
 * Equality comparison is performed with the `===`, with the exception that
 * `NaN` is considered equal to itself.
 */
export function scoringFromArrayUsingMap<Element>(
  order: Element[],
): Scoring<Element> {
  const orders = new Map<Element, number>();
  const {length} = order;
  for (let i = 0; i < length; i++) {
    orders.set(order[i], i);
  }

  return function scoringByMap(data: Element): number {
    return orders.get(data) ?? -1;
  };
}
