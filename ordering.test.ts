import {byNumber} from './comparators';
import {ordering} from './ordering';

describe('Ordering', () => {
  describe('reversed', () => {
    it('caches the original comparator in case of double reversal', () => {
      const numberOrdering = ordering(byNumber);
      const doubleReversed = numberOrdering.reversed().reversed();

      expect(doubleReversed.compare).toBe(numberOrdering.compare);
    });
  });

  describe('join', () => {
    it('returns this if given nothing to join', () => {
      const numberOrdering = ordering(byNumber);
      const result = numberOrdering.join();

      expect(result).toBe(numberOrdering);
    });
  });
});
