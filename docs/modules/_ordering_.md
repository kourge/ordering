[@kourge/ordering - v2.0.0-rc.0](../README.md) › ["ordering"](_ordering_.md)

# Module: "ordering"

Defines the [`Ordering`](../interfaces/_ordering_.ordering.md) interface that wraps around a
[`Comparator`](../interfaces/_comparator_.comparator.md) and provides convenience methods.

## Index

### Interfaces

* [Ordering](../interfaces/_ordering_.ordering.md)

### Functions

* [ordering](_ordering_.md#ordering)

## Functions

###  ordering

▸ **ordering**<**Element**>(`compare`: [Comparator](../interfaces/_comparator_.comparator.md)‹Element›): *[Ordering](../interfaces/_ordering_.ordering.md)‹Element›*

Wraps the given comparator in an [`Ordering`](../interfaces/_ordering_.ordering.md).

**Type parameters:**

▪ **Element**

**Parameters:**

Name | Type |
------ | ------ |
`compare` | [Comparator](../interfaces/_comparator_.comparator.md)‹Element› |

**Returns:** *[Ordering](../interfaces/_ordering_.ordering.md)‹Element›*
