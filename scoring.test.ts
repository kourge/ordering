import {scoringFromArray, scoringFromArrayUsingMap} from './scoring';

const order: Array<string | number> = ['foo', 3.14, '', NaN, 'bar', 5];

describe('scoringFromArray', () => {
  const f = scoringFromArray(order);

  it('handles a string correctly', () => {
    const result = f('foo');

    expect(result).toEqual(0);
  });

  it('handles a number correctly', () => {
    const result = f(3.14);

    expect(result).toEqual(1);
  });

  it('handles NaN correctly', () => {
    const result = f(NaN);

    expect(result).toEqual(3);
  });

  it('returns -1 for an unknown value', () => {
    const result = f('spam');

    expect(result).toEqual(-1);
  });
});

describe('scoringFromArrayByMap', () => {
  const f = scoringFromArrayUsingMap(order);

  it('handles a string correctly', () => {
    const result = f('foo');

    expect(result).toEqual(0);
  });

  it('handles a number correctly', () => {
    const result = f(3.14);

    expect(result).toEqual(1);
  });

  it('handles NaN correctly', () => {
    const result = f(NaN);

    expect(result).toEqual(3);
  });

  it('returns -1 for an unknown value', () => {
    const result = f('spam');

    expect(result).toEqual(-1);
  });
});
