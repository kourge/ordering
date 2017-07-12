import {
  alwaysEqual, byBoolean, byDate, byNumber, byString, join, ranking,
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

    expect(withJoin).toEqual(withoutJoin);
  });

  it('combines two comparators correctly', () => {
    const result = [z, x, w, y].sort(join(byId, byName));

    expect(result).toEqual([w, x, y, z]);
  });
});

describe('ranking', () => {
  enum Spam { Foo = 'foo', Bar = 'bar' }

  it('takes a scoring function', () => {
    const f = ranking<Spam>((s) => {
      switch (s) {
        case Spam.Foo: return 1;
        case Spam.Bar: return 2;
      }
    });

    expect(f(Spam.Foo, Spam.Foo)).toEqual(0);
    expect(f(Spam.Bar, Spam.Bar)).toEqual(0);
    expect(f(Spam.Foo, Spam.Bar)).toBeLessThan(0);
    expect(f(Spam.Bar, Spam.Foo)).toBeGreaterThan(0);
  });

  it('generates a scoring function from an array', () => {
    const f = ranking([Spam.Foo, Spam.Bar]);

    expect(f(Spam.Foo, Spam.Foo)).toEqual(0);
    expect(f(Spam.Bar, Spam.Bar)).toEqual(0);
    expect(f(Spam.Foo, Spam.Bar)).toBeLessThan(0);
    expect(f(Spam.Bar, Spam.Foo)).toBeGreaterThan(0);
  });
});

describe('byNumber', () => {
  it('compares by numeric value', () => {
    expect(byNumber(5, 9000)).toBeLessThan(0);
    expect(byNumber(9000, 5)).toBeGreaterThan(0);
  });

  it('defines equality', () => {
    expect(byNumber(42, 42)).toBe(0);
  });

  it('sorts numbers correctly', () => {
    const result = [1, 3, 5, 2, 4].sort(byNumber);

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('byString', () => {
  it('compares by lexicographic order', () => {
    expect(byString('a', 'b')).toBeLessThan(0);
    expect(byString('b', 'a')).toBeGreaterThan(0);
  });

  it('defines equality', () => {
    expect(byString('foobar', 'foobar')).toBe(0);
  });

  it('sorts strings correctly', () => {
    const input = ['B', 'b', 'A', 'a'];
    const expected = [...input].sort((a, b) => a.localeCompare(b));
    const result = [...input].sort(byString);

    expect(result).toEqual(expected);
  });

  describe('caseInsensitive', () => {
    it('defines equality', () => {
      expect(byString.caseInsensitive('a', 'A')).toBe(0);
    });
  });
});

describe('byDate', () => {
  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date();
  const yesterday = new Date(+today - oneDay);
  const tomorrow = new Date(+today + oneDay);

  it('compares by chronological order', () => {
    expect(byDate(yesterday, today)).toBeLessThan(0);
    expect(byDate(tomorrow, today)).toBeGreaterThan(0);
  });

  it('defines equality', () => {
    expect(byDate(today, today)).toBe(0);
  });

  it('sorts dates correctly', () => {
    const result = [tomorrow, yesterday, today].sort(byDate);

    expect(result).toEqual([yesterday, today, tomorrow]);
  });
});

describe('byBoolean', () => {
  it('compares by truth', () => {
    expect(byBoolean(false, true)).toBeLessThan(0);
    expect(byBoolean(true, false)).toBeGreaterThan(0);
  });

  it('defines equality', () => {
    expect(byBoolean(false, false)).toBe(0);
    expect(byBoolean(true, true)).toBe(0);
  });

  it('sorts booleans correctly', () => {
    const result = [false, true, false, true, false].sort(byBoolean);

    expect(result).toEqual([false, false, false, true, true]);
  });
});
