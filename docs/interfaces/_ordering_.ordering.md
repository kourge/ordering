[@kourge/ordering - v1.0.1](../README.md) › ["ordering"](../modules/_ordering_.md) › [Ordering](_ordering_.ordering.md)

# Interface: Ordering <**Element**>

An ordering is a wrapper around a [`Comparator`](_comparator_.comparator.md) that makes it easy
to create more comparators based on the wrapped one.

To make an ordering, call [`ordering`](../modules/_ordering_.md#ordering) with a comparator. To
retrieve the wrapped comparator from an ordering, access its `compare`
property.

An ordering can also be directly passed as a comparator to an array's `sort`
method, without any unwrapping.

**`example`** 
```ts
const orderingByNumber = ordering(byNumber);
orderingByNumber.compare === byNumber;

const a = [1, 10, 3, 8, 5, 6, 7, 4, 9, 2, 0];
a.sort(orderingByNumber);
```

## Type parameters

▪ **Element**

## Hierarchy

* [Comparator](_comparator_.comparator.md)‹Element›

  ↳ **Ordering**

## Callable

▸ (`a`: Element, `b`: Element): *number*

An ordering is a wrapper around a [`Comparator`](_comparator_.comparator.md) that makes it easy
to create more comparators based on the wrapped one.

To make an ordering, call [`ordering`](../modules/_ordering_.md#ordering) with a comparator. To
retrieve the wrapped comparator from an ordering, access its `compare`
property.

An ordering can also be directly passed as a comparator to an array's `sort`
method, without any unwrapping.

**`example`** 
```ts
const orderingByNumber = ordering(byNumber);
orderingByNumber.compare === byNumber;

const a = [1, 10, 3, 8, 5, 6, 7, 4, 9, 2, 0];
a.sort(orderingByNumber);
```

**Parameters:**

Name | Type |
------ | ------ |
`a` | Element |
`b` | Element |

**Returns:** *number*

## Index

### Properties

* [compare](_ordering_.ordering.md#compare)

### Methods

* [join](_ordering_.ordering.md#join)
* [on](_ordering_.ordering.md#on)
* [reversed](_ordering_.ordering.md#reversed)

## Properties

###  compare

• **compare**: *[Comparator](_comparator_.comparator.md)‹Element›*

The underlying comparator that drives this ordering.

## Methods

###  join

▸ **join**(...`comparatorsOrOrderings`: Array‹[Comparator](_comparator_.comparator.md)‹Element› | [Ordering](_ordering_.ordering.md)‹Element››): *[Ordering](_ordering_.ordering.md)‹Element›*

Joins the given comparators or orderings into a new ordering so that when
this ordering's comparison results in an equality, the next one is used as
a fallback.

**`example`** 
```ts
const orderingByName = ordering(byString).on<Person>(p => p.name);
const orderingByAge = ordering(byNumber).on<Person>(p => p.age);

const orderingByNameThenByAge = orderingByName.join(orderingByAge);
```

**Parameters:**

Name | Type |
------ | ------ |
`...comparatorsOrOrderings` | Array‹[Comparator](_comparator_.comparator.md)‹Element› &#124; [Ordering](_ordering_.ordering.md)‹Element›› |

**Returns:** *[Ordering](_ordering_.ordering.md)‹Element›*

___

###  on

▸ **on**<**T**>(`f`: function): *[Ordering](_ordering_.ordering.md)‹T›*

Derives an `Ordering<T>` out of the current `Ordering<Element>` given a
transformation function from `T` to `Element`.

A common use case is to compare objects based on a specific property, given
an existing comparator that already knows how to compare the type of that
property.

**`example`** 
```ts
interface Person {
  name: string;
  age: number;
}
const byName = ordering(byString).on<Person>(p => p.name);
const byAge = ordering(byNumber).on<Person>(p => p.age);
```

**Type parameters:**

▪ **T**

**Parameters:**

▪ **f**: *function*

▸ (`data`: T): *Element*

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |

**Returns:** *[Ordering](_ordering_.ordering.md)‹T›*

___

###  reversed

▸ **reversed**(): *[Ordering](_ordering_.ordering.md)‹Element›*

Returns an ordering that is a reversal of the current one.

**`example`** 
```ts
const byNumberDescending = ordering(byNumber).reverse();

const a = [1, 10, 3, 8, 5, 6, 7, 4, 9, 2, 0];
a.sort(byNumberDescending);
```

**Returns:** *[Ordering](_ordering_.ordering.md)‹Element›*
