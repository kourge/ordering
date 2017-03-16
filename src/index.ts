import {Comparator} from './comparator';

/**
 * An `Ordering<T>` provides convenience methods for using an existing
 * comparator or deriving another comparator out of an existing one.
 */
export class Ordering<T> {
  constructor(
    /**
     * The underlying comparator function that drives this ordering.
     */
    public compare: Comparator<T>
  ) {}

  /**
   * Returns an ordering that is a reversal of the current one.
   */
  reverse(): Ordering<T> {
    return new Ordering<T>((a, b) => -this.compare(a, b));
  }

  /**
   * Derives an `Ordering<U>` out of the current `Ordering<T>` given a
   * transformation function from `U` to `T`.
   */
  on<U>(f: (data: U) => T): Ordering<U> {
    return new Ordering((a: U, b: U): number =>
      this.compare(f(a), f(b))
    );
  }
}

/**
 * Constructs an Ordering given a comparator.
 */
export function ordering<T>(compare: Comparator<T>): Ordering<T> {
  return new Ordering<T>(compare);
}
