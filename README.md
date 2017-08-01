# ordering

`ordering` is a library for manipulating, projecting, and combining comparison
functions, which are used to sort an array. TypeScript definitions are included.

## `Comparator<T>`

A [comparator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description)
is a function that takes two values of the same kind and produces a number that
indicates if the first one is equal to, greater than, or lesser than the second
one. For example, given an array of numbers called `a`, to sort it correctly,
calling `a.sort()` is not enough; `a.sort((x, y) => x - y)` produces the
expected result. The `ordering/comparator` module exports predefined functions
that handle this:

```js
import {byNumber} from '@kourge/ordering/comparator';

const a = [1, 10, 3, 8, 5, 6, 7, 4, 9, 2, 0];
a.sort(byNumber);
```

The members exported by `ordering/comparator` are:
- `byNumber` sorts numbers from lowest to highest.
- `byString` sorts strings lexicographically according to the current locale.
- `byString.caseInsensitive` sorts strings with no case sensitivity according
  to the `en-US` locale.
- `byDate` sorts dates from earliest to latest.
- `byBoolean` sorts booleans from false to true.
- `alwaysEqual` pretends that every element in the array is equal. This is not
  the same as not sorting the array, since depending on the JavaScript engine,
  sorting may not be stable.
- `join` takes multiple comparators and combines them into a single one. If two
  elements are considered equal by the first one, the second one is used, and
  so on.
- `ranking` takes an array of primitive values or a scoring function and generates
  a comparator that sorts those values in the desired order.

```js
import {byString, byNumber, join} from '@kourge/ordering/comparator';

const byName = (person1, person2) => byString(person1.name, person2.name);
const byAge = (person1, person2) => byNumber(person1.age, person2.age);

const byNameThenByAge = join(byName, byAge);
```

```js
import {ranking} from '@kourge/ordering/comparator';

const byRarity = ranking([
  'common',
  'uncommon',
  'rare',
  'legendary',
  'exotic'
]);

const byAge = ranking(person => person.age);
```

## `Ordering<T>`

An ordering is a wrapper around a comparator that provides deeper utilities. To
make an ordering, call `ordering` with a comparator. To retrieve the comparator
from an ordering, access its `compare` property.

```js
import {ordering} from '@kourge/ordering';
import {byNumber} from '@kourge/ordering/comparator';

const numericOrdering = ordering(byNumber);
numericOrdering.compare === byNumber;
```

The methods defined on an ordering are:
- `reverse()` returns a new ordering that sorts in the opposite order of the
  current one.
- `on(f)` returns a new ordering that "projects" this one onto `f`, i.e. the
  new ordering instead sorts whatever `f` takes and orders them according to
  the return value of `f` under the current ordering.

To sort by descending numeric order, for example:

```js
import {ordering} from '@kourge/ordering';
import {byNumber} from '@kourge/ordering/comparator';

const byNumberDescending = ordering(byNumber).reverse().compare;

const a = [1, 10, 3, 8, 5, 6, 7, 4, 9, 2, 0];
a.sort(byNumberDescending);
```

To simplify the earlier person-sorting examples:

```js
import {ordering} from '@kourge/ordering';
import {byString, byNumber, join} from '@kourge/ordering/comparator';

const byName = ordering(byString).on(person => person.name).compare;
const byAge = ordering(byNumber).on(person => person.age).compare;

const byNameThenByAge = join(byName, byAge);
```

By combining these different utilities, any kind of complex data or object can
be sorted with ease.

## `Scoring<T>`

A `Scoring<T>` offers a simpler alternative to a comparator. Instead of
comparing two different values, a scoring function takes a value and produces
a numeric score. These scores are then used to sort values. This is achieved by
converting the `Scoring<T>` into a `Comparator<T>` through the `ranking`
function.

From this relationship between a scoring function and a comparator arises two
things of note:

1. `ranking(f)` is equivalent to `ordering(byNumber).on(f).compare`.
1. A scoring function is called many times over the course of sorting, so take
   care that it is efficient.

The members exported by `ordering/scoring` are:
- `scoringFromArray` generates a scoring from an array. It performs a reverse
  lookup from the array: given an element, it produces the element's index in
  the array. Linear search is needed, and the `SameValueZero` algorithm is used
  for equality.
- `scoringFromArrayByMap` also generates a scoring from an array. Its behavior
  is almost identical to `scoringFromArray`. The difference is that it uses an
  ECMAScript 6 `Map` to perform the same reverse lookup, and thus its
  performance characteristics should be sublinear. Furthermore, this only works
  if the environment has a `Map` available.

## TypeScript support

This module can be directly imported in TypeScript. `Comparator<T>` and
`Ordering<T>` are both importable interfaces. Note that `join` only allows
joining comparators that compare the same type. Additionally the `on` method
provided by `Ordering<T>` can feel even more succinct when combining type
annotation and destructuring:

```ts
import {ordering} from '@kourge/ordering';
import {byString, byNumber, join, ranking} from '@kourge/ordering/comparator';

const byName = ordering(byString).on<Person>(({name}) => name).compare;
const byAge = ordering(byNumber).on<Person>(({age}) => age).compare;

const byNameThenByAge = join(byName, byAge);

enum Rarity {
  Common, Uncommon, Rare, Legendary, Exotic
}

const byRarity = ranking<Rarity>([
  Rarity.Common,
  Rarity.Uncommon,
  Rarity.Rare,
  Rarity.Legendary,
  Rarity.Exotic,
]);
```