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

```js
import {byString, byNumber, join} from '@kourge/ordering/comparator';

const byName = (person1, person2) => byString(person1.name, person2.name);
const byAge = (person1, person2) => byNumber(person1.age, person2.age);

const byNameThenByAge = join(byName, byAge);
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

## TypeScript support

This module can be directly imported in TypeScript. `Comparator<T>` is an
importable interface, and `Ordering<T>` is an importable class. Note that
`join` only allows joining comparators that compare the same type. Additionally
the `on` method provided by `Ordering<T>` can feel even more succinct when
combining type annotation and destructuring:

```ts
import {ordering} from '@kourge/ordering';
import {byString, byNumber, join} from '@kourge/ordering/comparator';

const byName = ordering(byString).on<Person>(({name}) => name).compare;
const byAge = ordering(byNumber).on<Person>(({age}) => age).compare;

const byNameThenByAge = join(byName, byAge);
```