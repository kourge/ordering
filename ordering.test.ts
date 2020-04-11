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

  describe('on', () => {
    interface Thing {
      id: number;
    }

    const w: Thing = {id: 7};
    const x: Thing = {id: 3};
    const y: Thing = {id: 5};

    it('derives a comparator correctly', () => {
      const byThingId = ordering(byNumber).on<Thing>(({id}) => id).compare;

      expect(byThingId(x, y)).toBeLessThan(0);
      expect(byThingId(x, x)).toBe(0);
      expect(byThingId(w, x)).toBeGreaterThan(0);
    });
  });
});
