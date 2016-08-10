
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

  /**
   * Joins zero or more existing orderings so that when a comparison results
   * in equality, the next one is used as a fallback. If no orderings are
   * given, the resulting ordering considers every comparison as equal.
   */
  export function join<T>(...orderings: Ordering<T>[]): Ordering<T> {
    switch (orderings.length) {
      case 0:
        return alwaysEqual;
      case 1:
        return orderings[0];
      default:
        return function chainedOrdering(a: T, b: T): number {
          const lastIndex = orderings.length - 1;
          const last = orderings[lastIndex];
          const rest = orderings.slice(0, lastIndex);

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

/**
 * An ordering that reports every comparison as equal.
 */
export function alwaysEqual<T>(a: T, b: T): number {
  return 0;
}

/**
 * An ordering that compares numbers.
 */
export function byNumber(a: number, b: number): number {
  return a - b;
}

/**
 * An ordering that compares strings lexicographically according to the current
 * locale's collation.
 */
export function byString(a: string, b: string): number {
  return a.localeCompare(b);
}

export namespace byString {
  /**
   * An ordering that compares strings lexicographically according to the current
   * locale's collation, but does so while ignoring case as defined by the corrent
   * locale.
   */
  export function caseInsensitive(a: string, b: string): number {
    return a.localeCompare(b, 'en-US', {sensitivity: 'base'});
  }
}

/**
 * An ordering that compares dates by chronological order. An earlier date is
 * considered smaller than a later one.
 */
export function byDate(a: Date, b: Date): number {
  return +a - +b;
}

/**
 * An ordering that compares booleans by truth. Falsehood is considered smaller
 * than truth.
 */
export function byBoolean(a: boolean, b: boolean): number {
  return +a - +b;
}
