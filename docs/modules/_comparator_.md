[@kourge/ordering - v2.0.0-rc.0](../README.md) › ["comparator"](_comparator_.md)

# Module: "comparator"

Defines the [`Comparator`](../interfaces/_comparator_.comparator.md) interface, as well as providing various
convenience functions for creating comparators out of data or other existing
comparators.

## Index

### Interfaces

* [Comparator](../interfaces/_comparator_.comparator.md)

### Functions

* [join](_comparator_.md#join)
* [keyed](_comparator_.md#keyed)
* [ranking](_comparator_.md#ranking)
* [reversed](_comparator_.md#reversed)

## Functions

###  join

▸ **join**<**Element**>(...`comparators`: [Comparator](../interfaces/_comparator_.comparator.md)‹Element›[]): *[Comparator](../interfaces/_comparator_.comparator.md)‹Element›*

Joins one or more existing comparators into a new comparator so that when a
comparison results in equality, the next one is used as a fallback.

**`throws`** {`TypeError`} if no comparators are given

**`example`** 
```ts
const byName = (person1, person2) => byString(person1.name, person2.name);
const byAge = (person1, person2) => byNumber(person1.age, person2.age);

const byNameThenByAge = join(byName, byAge);
```

**Type parameters:**

▪ **Element**

**Parameters:**

Name | Type |
------ | ------ |
`...comparators` | [Comparator](../interfaces/_comparator_.comparator.md)‹Element›[] |

**Returns:** *[Comparator](../interfaces/_comparator_.comparator.md)‹Element›*

___

###  keyed

▸ **keyed**<**Element**, **Property**>(`keyOf`: function, `keyComparator`: [Comparator](../interfaces/_comparator_.comparator.md)‹Property›): *[Comparator](../interfaces/_comparator_.comparator.md)‹Element›*

Creates a comparator that compares two elements based on their keys.

The `keyOf` function is called repeatedly throughout the sorting process, so
make sure that it is efficient. If it is computationally costly to calculate
the key of an element, consider using a `Map` or a `WeakMap` to cache a key
once it is calculated.

**`example`** 
```ts
interface Person {
  name: string;
  age: number;
}

const byAge = keyed((person: Person) => person.age, byNumber);
```

**Type parameters:**

▪ **Element**

▪ **Property**

**Parameters:**

▪ **keyOf**: *function*

a function that calculates the key of an element

▸ (`element`: Element): *Property*

**Parameters:**

Name | Type |
------ | ------ |
`element` | Element |

▪ **keyComparator**: *[Comparator](../interfaces/_comparator_.comparator.md)‹Property›*

a comparator that can compare keys returned by `keyOf`

**Returns:** *[Comparator](../interfaces/_comparator_.comparator.md)‹Element›*

___

###  ranking

▸ **ranking**<**Element**>(`scoring`: Element[] | [Scoring](../interfaces/_scoring_.scoring.md)‹Element›): *[Comparator](../interfaces/_comparator_.comparator.md)‹Element›*

Generates a [`Comparator`](../interfaces/_comparator_.comparator.md) given an array of ordered elements or a
scoring function [`Scoring`](../interfaces/_scoring_.scoring.md). This is useful for any sort of
enum-like type, where a limited subset of strings and / or numbers are used
for special meaning.

When given an array, a scoring function is generated to look up from that
array. This lookup process is at least linear, but becomes more efficient if
a good implementation of `Map` is available in the environment. If the lookup
fails because an unknown element not in the array was given, then it is given
the lowest possible score of -1.

**`example`** 
```ts
const byVowelCount = ranking<string>(word => word.match(/[aeiou]/gi).length);

enum Rarity {
  Common,
  Uncommon,
  Rare,
  Legendary,
  Exotic,
}

const byRarity = ranking<Rarity>([
  Rarity.Common,
  Rarity.Uncommon,
  Rarity.Rare,
  Rarity.Legendary,
  Rarity.Exotic,
]);
```

**Type parameters:**

▪ **Element**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`scoring` | Element[] &#124; [Scoring](../interfaces/_scoring_.scoring.md)‹Element› | An array denoting the desired order of ranking, or a custom scoring function  |

**Returns:** *[Comparator](../interfaces/_comparator_.comparator.md)‹Element›*

___

###  reversed

▸ **reversed**<**Element**>(`comparator`: [Comparator](../interfaces/_comparator_.comparator.md)‹Element›): *[Comparator](../interfaces/_comparator_.comparator.md)‹Element›*

Creates a reversed version of the given comparator.

**`example`** 
```ts
const byNumberDescending = reversed(byNumber);
```

**Type parameters:**

▪ **Element**

**Parameters:**

Name | Type |
------ | ------ |
`comparator` | [Comparator](../interfaces/_comparator_.comparator.md)‹Element› |

**Returns:** *[Comparator](../interfaces/_comparator_.comparator.md)‹Element›*
