[@kourge/ordering - v1.0.1](../README.md) › ["comparators"](_comparators_.md)

# Module: "comparators"

Provides ready-to-use comparators for sorting most JavaScript built-in types.

## Index

### Functions

* [byBoolean](_comparators_.md#byboolean)
* [byCodeUnit](_comparators_.md#bycodeunit)
* [byDate](_comparators_.md#bydate)
* [byNumber](_comparators_.md#bynumber)
* [byString](_comparators_.md#bystring)
* [byStringWithoutCaseSensitivity](_comparators_.md#bystringwithoutcasesensitivity)

## Functions

###  byBoolean

▸ **byBoolean**(`a`: boolean, `b`: boolean): *number*

Compares booleans by truthiness. Falsehood is considered smaller than truth.

**`example`** 
```ts
const a = [true, false, true];
a.sort(byBoolean);
// => [false, true, true]
```

**Parameters:**

Name | Type |
------ | ------ |
`a` | boolean |
`b` | boolean |

**Returns:** *number*

___

###  byCodeUnit

▸ **byCodeUnit**(`a`: string, `b`: string): *number*

Compares strings by code unit order. This is especially useful when
serializing unordered data (e.g. a map or a plain object) to disk, since it
enforces predictable ordering and can mitigate merge conflicts to a certain
degree.

Refer to section 7.2.11 of the ECMAScript Language Specification (6th Edition
/ June 2015) for more details.

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |
`b` | string |

**Returns:** *number*

___

###  byDate

▸ **byDate**(`a`: Date, `b`: Date): *number*

Compares dates by chronological order. An earlier date is considered smaller
than a later one.

**`example`** 
```ts
const today = new Date();
const yesterday = new Date(+today - 86400000);
const tomorrow = new Date(+today + 86400000);
const a = [tomorrow, yesterday, today];
a.sort(byDate);
// => [yesterday, today, tomorrow]
```

**Parameters:**

Name | Type |
------ | ------ |
`a` | Date |
`b` | Date |

**Returns:** *number*

___

###  byNumber

▸ **byNumber**(`a`: number, `b`: number): *number*

Compares numbers.

**`example`** 
```ts
const a = [6, 3, 2, 8, 7, 6, 9, 4, 3, 8];
a.sort(byNumber);
// => [2, 3, 3, 4, 6, 6, 7, 8, 8, 9]
```

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | number |

**Returns:** *number*

___

###  byString

▸ **byString**(`a`: string, `b`: string): *number*

Compares strings lexicographically according to the current locale's
collation.

**`example`** 
```ts
const a = [
  'tove', 'wave', 'borogove', 'rath', 'jabberwock', 'jubjub', 'bandersnatch',
  'tumtum', 'tulgey'
];
a.sort(byString);
// => [
//   'bandersnatch', 'borogove', 'jabberwock', 'jubjub', 'rath', 'tove',
//   'tulgey', 'tumtum', 'wave'
// ]
```

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |
`b` | string |

**Returns:** *number*

___

###  byStringWithoutCaseSensitivity

▸ **byStringWithoutCaseSensitivity**(`a`: string, `b`: string): *number*

Compares strings lexicographically according to the current locale's
collation, but does so while ignoring case as defined by the current locale.

**`example`** 
```ts
const a = ['Variks', 'judgment', 'Mithrax', 'light', 'Eramis', 'ship']
a.sort(byStringWithoutCaseSensitivity);
// => ['Eramis', 'judgment', 'light', 'Mithrax', 'ship', 'Variks']
```

**Parameters:**

Name | Type |
------ | ------ |
`a` | string |
`b` | string |

**Returns:** *number*
