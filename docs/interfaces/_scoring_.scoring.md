[@kourge/ordering - v2.0.0-rc.0](../README.md) › ["scoring"](../modules/_scoring_.md) › [Scoring](_scoring_.scoring.md)

# Interface: Scoring <**Element**>

A scoring function `Scoring<Element>` offers a simpler alternative to a
[`Comparator`](_comparator_.comparator.md). Instead of comparing two different elements, a
scoring function instead takes an element and produces a numeric score. These
scores are then used to sort compare elements against each other. This is
achieved by using the [`ranking`](../modules/_comparator_.md#ranking) function to create a
[`Comparator`](_comparator_.comparator.md) out of a scoring function.

A scoring function is called repeatedly throughout the sorting process, so
make sure that it is efficient. If it is computationally costly to calculate
the score of an element, consider using a `Map` or a `WeakMap` to cache a
score once it is calculated.

## Type parameters

▪ **Element**

## Hierarchy

* **Scoring**

## Callable

▸ (`data`: Element): *number*

A scoring function `Scoring<Element>` offers a simpler alternative to a
[`Comparator`](_comparator_.comparator.md). Instead of comparing two different elements, a
scoring function instead takes an element and produces a numeric score. These
scores are then used to sort compare elements against each other. This is
achieved by using the [`ranking`](../modules/_comparator_.md#ranking) function to create a
[`Comparator`](_comparator_.comparator.md) out of a scoring function.

A scoring function is called repeatedly throughout the sorting process, so
make sure that it is efficient. If it is computationally costly to calculate
the score of an element, consider using a `Map` or a `WeakMap` to cache a
score once it is calculated.

**Parameters:**

Name | Type |
------ | ------ |
`data` | Element |

**Returns:** *number*
