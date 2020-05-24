# ordering

`ordering` is a library for manipulating, projecting, and combining comparison
functions, which are used to sort an array. TypeScript definitions are included.

## Motivation

Out of the box, calling the `sort` method on an array usually does not do what
we want. For example, an array of numbers is coerced to strings and then sorted
by code unit, giving surprising results. To solve this, the `sort` method takes
a function that can compare two elements in an array, called a comparator.

This library provides a set of ready-to-use comparators for sorting most
built-in JavaScript types, as well as a variety of utilities to make more
comparators.

## Broad Examples

Here is a quick overview of what it's like to use `ordering`.

### Sorting numbers

```ts
import {byNumber} from '@kourge/ordering/comparators';

const a = [6, 3, 2, 8, 7, 6, 9, 4, 3, 8];
a.sort(byNumber);
// => [2, 3, 3, 4, 6, 6, 7, 8, 8, 9]
```

### Sorting strings without case sensitivity

```ts
import {byStringWithoutCaseSensitivity} from '@kourge/ordering/comparators';

const a = ['Variks', 'judgment', 'Mithrax', 'light', 'Eramis', 'ship'];
a.sort(byStringWithoutCaseSensitivity);
// => ['Eramis', 'judgment', 'light', 'Mithrax', 'ship', 'Variks']
```

### Sorting objects by their properties

```ts
import {ordering} from '@kourge/ordering';
import {byNumber, byString} from '@kourge/ordering/comparators';

interface Person {
  name: string;
  age: number;
}

const byName = ordering(byString).on<Person>(p => p.name);
const byAge = ordering(byNumber).on<Person>(p => p.age);
const byNameThenByAge = byName.join(byAge);
```

## API Documentation

See the [`docs`](./docs) directory for a comprehensive documentation of the API.
