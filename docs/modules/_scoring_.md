[@kourge/ordering - v1.0.1](../README.md) › ["scoring"](_scoring_.md)

# Module: "scoring"

Defines the [`Scoring`](../interfaces/_scoring_.scoring.md) interface, a simpler alternative to the
[`Comparator`](../interfaces/_comparator_.comparator.md) interface.

## Index

### Interfaces

* [Scoring](../interfaces/_scoring_.scoring.md)

### Functions

* [scoringFromArray](_scoring_.md#scoringfromarray)
* [scoringFromArrayUsingMap](_scoring_.md#scoringfromarrayusingmap)

## Functions

###  scoringFromArray

▸ **scoringFromArray**<**Element**>(`order`: Element[]): *[Scoring](../interfaces/_scoring_.scoring.md)‹Element›*

Generates a [`Scoring`](../interfaces/_scoring_.scoring.md) function from the given array, whose order is
used to produce the numeric score. The efficiency of the result scoring
function is linear.

The array should contain all possible values under type `Element`, but in the
scenario that the scoring function is called with an unknown value absent
from the array, -1 is returned.

Equality comparison is performed with the `===`, with the exception that
`NaN` is considered equal to itself.

**Type parameters:**

▪ **Element**

**Parameters:**

Name | Type |
------ | ------ |
`order` | Element[] |

**Returns:** *[Scoring](../interfaces/_scoring_.scoring.md)‹Element›*

___

###  scoringFromArrayUsingMap

▸ **scoringFromArrayUsingMap**<**Element**>(`order`: Element[]): *[Scoring](../interfaces/_scoring_.scoring.md)‹Element›*

Generates a [`Scoring`](../interfaces/_scoring_.scoring.md) function from the given array, whose order is
used to produce the numeric score. The efficiency of the result scoring
function is sublinear, but relies on the environment to provide a good
implementation of `Map`.

The array should contain all possible values under type `Element`, but in the
scenario that the scoring function is called with an unknown value absent
from the array, -1 is returned.

Equality comparison is performed with the `===`, with the exception that
`NaN` is considered equal to itself.

**Type parameters:**

▪ **Element**

**Parameters:**

Name | Type |
------ | ------ |
`order` | Element[] |

**Returns:** *[Scoring](../interfaces/_scoring_.scoring.md)‹Element›*
