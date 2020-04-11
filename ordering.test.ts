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
});
