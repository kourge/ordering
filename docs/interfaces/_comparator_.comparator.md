[@kourge/ordering - v2.0.0-rc.0](../README.md) › ["comparator"](../modules/_comparator_.md) › [Comparator](_comparator_.comparator.md)

# Interface: Comparator <**Element**>

A [comparator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description)
is a function that takes two elements of the same type and returns a number
that indicates the comparison result.

## Type parameters

▪ **Element**

## Hierarchy

* **Comparator**

  ↳ [Ordering](_ordering_.ordering.md)

## Callable

▸ (`a`: Element, `b`: Element): *number*

A [comparator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description)
is a function that takes two elements of the same type and returns a number
that indicates the comparison result.

**Parameters:**

Name | Type |
------ | ------ |
`a` | Element |
`b` | Element |

**Returns:** *number*

- `0` or `-0` if the two elements are considered equal.
- Any number greater than `0` if the first element is greater than the second
  one.
- Any number lesser than `0` if the first is lesser than the second.
