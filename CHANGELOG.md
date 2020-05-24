# Changelog

All changes that affect usage and behavior will be documented here.

## v2.0.0

- All documentation is now automatically generated from JSDoc that lives
  alongside the source code.
- Split `comparator` into two modules:
  - `comparator` contains functions that create comparators.
  - `comparators` contains comparators that can be directly used to sort arrays.

### `comparator` module

- Changed the `join` function. It no longer allows joining zero comparators. At
  least one must be provided. Otherwise a `TypeError` is thrown.
- Added the `reversed` function.
- Added the `keyed` function.

### `comparators` module

- Removed the `alwaysEqual` comparator. It existed to support joining zero
  comparators, which is no longer allowed by `join`.
- Renamed the `byString.caseInsensitive` comparator to
  `byStringWithoutCaseSensitivity`.
  - Bug fix: it now tries to use your environment's locale, instead of always
    specifying `en-US`.

### `scoring` module

- Renamed the `scoringFromArrayByMap` function to `scoringFromArrayUsingMap`.

### `ordering` module

- An `Ordering` can now be directly used as a `Comparator`.
- Renamed the `reverse` method to `reversed`.
- Added the `join` method.

## v1.0.0

- Initial release.
