import {Comparator, reversed} from './comparator';

class Ordering_<T> {
  constructor(public compare: Comparator<T>) {}

  reversed(): Ordering<T> {
    const result = ordering<T>(reversed(this.compare));

    // Cache the current ordering as the reverse of the reversed ordering.
    result.reversed = () => this;

    return result;
  }

  on<U>(f: (data: U) => T): Ordering<U> {
    return ordering<U>((a, b) => this.compare(f(a), f(b)));
  }
}

/**
 * An `Ordering<T>` provides convenience methods for using an existing
 * comparator or deriving another comparator out of an existing one.
 */
export interface Ordering<T> {
  /**
   * The underlying comparator function that drives this ordering.
   */
  compare: Comparator<T>;

  /**
   * Returns an ordering that is a reversal of the current one.
   */
  reversed(): Ordering<T>;

  /**
   * Derives an `Ordering<U>` out of the current `Ordering<T>` given a
   * transformation function from `U` to `T`.
   */
  on<U>(f: (data: U) => T): Ordering<U>;
}

/**
 * Constructs an Ordering given a comparator.
 */
export function ordering<T>(compare: Comparator<T>): Ordering<T> {
  return new Ordering_<T>(compare);
}
