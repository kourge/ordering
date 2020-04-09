/**
 * A `Scoring<T>` is a function that takes an item of type `T` and returns a
 * numeric score of said item, which is meant to denote ranking. A scoring
 * function is often invoked many times, so take care that it is efficient.
 */
export interface Scoring<T> {
  (data: T): number;
}

/**
 * Generates a `Scoring<T>` from the given array `T[]`, whose order is used to
 * produce the numeric score. The efficiency of the scoring function is linear.
 *
 * It is recommended that the array contains all possible values under type `T`,
 * but in the scenario that the scoring function is called with an unknown
 * value, -1 is returned. Equality is done with the `SameValueZero` algorithm
 * as defined in the ECMAScript spec.
 */
export function scoringFromArray<T>(order: T[]): Scoring<T> {
  return function scoring(data: T): number {
    const {length} = order;

    if (data !== data) {
      // Handle isNaN(data) specifically.
      for (let i = 0; i < length; i++) {
        const v = order[i];
        if (v !== v) {
          return i;
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (order[i] === data) {
          return i;
        }
      }
    }

    return -1;
  };
}

/**
 * Generates a `Scoring<T>` from the given array `T[]`, whose order is used to
 * produce the numeric score. The efficiency of the scoring function is
 * sublinear, but only works if the runtime supports the ECMAScript 6 `Map`.
 *
 * It is recommended that the array contains all possible values under type `T`,
 * but in the scenario that the scoring function is called with an unknown
 * value, -1 is returned. Equality is done with the `SameValueZero` algorithm
 * as defined in the ECMAScript spec.
 */
export function scoringFromArrayByMap<T>(order: T[]): Scoring<T> {
  const orders = new Map<T, number>();
  const {length} = order;
  for (let i = 0; i < length; i++) {
    orders.set(order[i], i);
  }

  return function scoringByMap(data: T): number {
    const result = orders.get(data);
    return result === undefined ? -1 : result;
  };
}
