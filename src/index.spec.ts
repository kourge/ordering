import {expect} from 'chai';
import {Ordering, WrappedOrdering} from './index';
import {byNumber} from './comparator';

describe('join', () => {
  interface Thing {
    id: number;
    name: string;
  }

  function byId(a: Thing, b: Thing): number {
    return a.id - b.id;
  }

  function byName(a: Thing, b: Thing): number {
    return a.name.localeCompare(b.name);
  }

  const w: Thing = {id: 3, name: 'w'};
  const x: Thing = {id: 3, name: 'x'};
  const y: Thing = {id: 7, name: 'y'};
  const z: Thing = {id: 7, name: 'z'};

  it('does not alter a single ordering', () => {
    const withoutJoin = [z, x, w, y].sort(byName);
    const withJoin = [z, x, w, y].sort(Ordering.join(byName));

    expect(withJoin).to.deep.equal(withoutJoin);
  });

  it('combines two orderings correctly', () => {
    const result = [z, x, w, y].sort(Ordering.join(byId, byName));

    expect(result).to.deep.equal([w, x, y, z]);
  });
});

describe('WrappedOrdering', () => {
  describe('reverse', () => {
    const byNumberReversed = new WrappedOrdering(byNumber).reverse().ordering;

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
  });

  describe('on', () => {
    interface Thing {
      id: number;
    }

    const w: Thing = {id: 7};
    const x: Thing = {id: 3};
    const y: Thing = {id: 5};

    it('derives an ordering correctly', () => {
      const byThingId = new WrappedOrdering(byNumber)
        .on<Thing>(({id}) => id)
        .ordering;

      expect(byThingId(x, y)).to.be.lessThan(0);
      expect(byThingId(x, x)).to.equal(0);
      expect(byThingId(w, x)).to.be.greaterThan(0);
    });
  });
});
