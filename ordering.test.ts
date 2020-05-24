import {byNumber, byString} from './comparators';
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

describe('ordering', () => {
  it('forwards to the latest underlying comparator', () => {
    const oldUnderlying = jest.fn(byNumber);
    const newUnderlying = jest.fn(byNumber);
    const orderingByNumber = ordering(oldUnderlying);
    orderingByNumber.compare = newUnderlying;
    [2, 1].sort(orderingByNumber);

    expect(oldUnderlying).not.toHaveBeenCalled();
    expect(newUnderlying).toMatchInlineSnapshot(`
      [MockFunction] {
        "calls": Array [
          Array [
            2,
            1,
          ],
        ],
        "results": Array [
          Object {
            "type": "return",
            "value": 1,
          },
        ],
      }
    `);
  });

  it('updates its own name when the underlying comparator changes', () => {
    const oldUnderlying = byNumber;
    const newUnderlying = byString;

    const o = ordering<any>(oldUnderlying);
    expect(o.name).toMatchInlineSnapshot(`"ordering(byNumber)"`);

    o.compare = newUnderlying;
    expect(o.name).toMatchInlineSnapshot(`"ordering(byString)"`);
  });
});
