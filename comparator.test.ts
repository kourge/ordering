import {join, ranking} from './comparator';

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
  byName.displayName = 'byLocaleName';

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

  it('defines a debuggale function name', () => {
    const joined = join(byId, byName);

    expect(joined.name).toBe(
      `joinedComparator(${byId.name}, ${byName.displayName})`,
    );
  });
});

describe('ranking', () => {
  enum Spam {
    Foo = 'foo',
    Bar = 'bar',
  }

  it('takes a scoring function', () => {
    const f = ranking<Spam>(s => {
      switch (s) {
        case Spam.Foo:
          return 1;
        case Spam.Bar:
          return 2;
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
