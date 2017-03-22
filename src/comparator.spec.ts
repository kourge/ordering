import {expect} from 'chai';
import {
  alwaysEqual, join, byNumber, byString, byDate, byBoolean
} from './comparator';

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

  it('does not alter a single comparator', () => {
    const withoutJoin = [z, x, w, y].sort(byName);
    const withJoin = [z, x, w, y].sort(join(byName));

    expect(withJoin).to.deep.equal(withoutJoin);
  });

  it('combines two comparators correctly', () => {
    const result = [z, x, w, y].sort(join(byId, byName));

    expect(result).to.deep.equal([w, x, y, z]);
  });
});

describe('byNumber', () => {
  it('compares by numeric value', () => {
    expect(byNumber(5, 9000)).to.be.lessThan(0);
    expect(byNumber(9000, 5)).to.be.greaterThan(0);
  });

  it('defines equality', () => {
    expect(byNumber(42, 42)).to.equal(0);
  });

  it('sorts numbers correctly', () => {
    const result = [1, 3, 5, 2, 4].sort(byNumber);

    expect(result).to.deep.equal([1, 2, 3, 4, 5]);
  });
});

describe('byString', () => {
  it('compares by lexicographic order', () => {
    expect(byString('a', 'b')).to.be.lessThan(0);
    expect(byString('b', 'a')).to.be.greaterThan(0);
  });

  it('defines equality', () => {
    expect(byString('foobar', 'foobar')).to.equal(0);
  });

  it('sorts strings correctly', () => {
    const result = ['B', 'b', 'A', 'a'].sort(byString);

    expect(result).to.deep.equal(['a', 'A', 'b', 'B']);
  });

  describe('caseInsensitive', () => {
    it('defines equality', () => {
      expect(byString.caseInsensitive('a', 'A')).to.equal(0);
    });
  });
});

describe('byDate', () => {
  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  const yesterday = new Date(+today - oneDay);
  const tomorrow = new Date(+today + oneDay);

  it('compares by chronological order', () => {
    expect(byDate(yesterday, today)).to.be.lessThan(0);
    expect(byDate(tomorrow, today)).to.be.greaterThan(0);
  });

  it('defines equality', () => {
    expect(byDate(today, today)).to.equal(0);
  });

  it('sorts dates correctly', () => {
    const result = [tomorrow, yesterday, today].sort(byDate);

    expect(result).to.deep.equal([yesterday, today, tomorrow]);
  });
});

describe('byBoolean', () => {
  it('compares by truth', () => {
    expect(byBoolean(false, true)).to.be.lessThan(0);
    expect(byBoolean(true, false)).to.be.greaterThan(0);
  });

  it('defines equality', () => {
    expect(byBoolean(false, false)).to.equal(0);
    expect(byBoolean(true, true)).to.equal(0);
  });

  it('sorts booleans correctly', () => {
    const result = [false, true, false, true, false].sort(byBoolean);

    expect(result).to.deep.equal([false, false, false, true, true]);
  });
});