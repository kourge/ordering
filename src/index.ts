import {alwaysEqual} from './comparator';

/**
 * An `Ordering<T>` can compare two items of type `T`. A return value of 0 means
 * the two items are equal, a value lesser than 0 means `a` is lesser than `b`,
 * and a value greater than 0 means `a` is great than `b`.
 */
export interface Ordering<T> {
  (a: T, b: T): number;
}

export namespace Ordering {
  /**
   * Wraps a plain `Ordering<T>` in a `WrappedOrdering<T>`.
   */
  export function of<T>(ordering: Ordering<T>): WrappedOrdering<T> {
    return new WrappedOrdering(ordering);
  }
}

/**
 * A `WrappedOrdering<T>` provides convenience methods for using an existing
 * ordering or deriving another ordering out of an existing one.
 */
export class WrappedOrdering<T> {
  constructor(public ordering: Ordering<T>) {}

  /**
   * Returns an ordering that is a reversal of the current one.
   */
  reverse(): WrappedOrdering<T> {
    return new WrappedOrdering((a: T, b: T): number =>
      -this.ordering(a, b)
    );
  }

  /**
   * Derives an `Ordering<U>` out of the current `Ordering<T>` given a
   * transformation function from `U` to `T`.
   */
  on<U>(f: (data: U) => T): WrappedOrdering<U> {
    return new WrappedOrdering((a: U, b: U): number =>
      this.ordering(f(a), f(b))
    );
  }
}
