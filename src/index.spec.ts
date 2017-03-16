import {expect} from 'chai';
import {ordering} from './index';
import {byNumber} from './comparator';

describe('Ordering', () => {
  describe('reverse', () => {
    const byNumberReversed = ordering(byNumber).reverse().compare;

    it('retains equality', () => {
      expect(byNumber(0, 0)).to.equal(0);
      expect(byNumberReversed(0, 0)).to.equal(0);
    });

    it('flips less than to greater than', () => {
      expect(byNumber(5, 9000)).to.be.lessThan(0);
      expect(byNumberReversed(5, 9000)).to.be.greaterThan(0);
    });

    it('flips greater than to less than', () => {
      expect(byNumber(9000, 5)).to.be.greaterThan(0);
      expect(byNumberReversed(9000, 5)).to.be.lessThan(0);
    });

    it('sorts numbers in reverse', () => {
      const result = [1, 3, 5, 2, 4].sort(byNumberReversed);

      expect(result).to.deep.equal([5, 4, 3, 2, 1]);
    });

    it('caches the original comparator in case of double reversal', () => {
      const numberOrdering = ordering(byNumber);
      const doubleReversed = numberOrdering
        .reverse()
        .reverse();

      expect(doubleReversed.compare).to.equal(numberOrdering.compare);
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
      const byThingId = ordering(byNumber)
        .on<Thing>(({id}) => id)
        .compare;

      expect(byThingId(x, y)).to.be.lessThan(0);
      expect(byThingId(x, x)).to.equal(0);
      expect(byThingId(w, x)).to.be.greaterThan(0);
    });
  });
});
