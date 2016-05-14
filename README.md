# most-recent-file

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Codecov Status][codecov-image]][codecov-url]
[![Standard][standard-image]][standard-url]

> Gets the most recent file on a given path

## Install

```sh
npm install --save most-recent-file
```

## Usage

```js
import mostRecentFile from 'most-recent-file'
mostRecentFile(path, fn)
```

- `path` {string} The path to test for files
- `fn` {Function} Callback, the arguments are
  - `err` {Error} Error object if there was a problem while getting the stats, `null` otherwise
  - `file` {string|null} A string with the filename of the most recent file, `null` when there are no files in the given path

## License

MIT © 2016 [Mauricio Poppe](http://maurizzzio.com)

[npm-url]: https://npmjs.org/package/most-recent-file
[npm-image]: https://img.shields.io/npm/v/most-recent-file.svg?style=flat

[travis-url]: https://travis-ci.org/maurizzzio/most-recent-file
[travis-image]: https://img.shields.io/travis/maurizzzio/most-recent-file.svg?style=flat

[codecov-url]: https://codecov.io/github/maurizzzio/most-recent-file
[codecov-image]: https://img.shields.io/codecov/c/github/maurizzzio/most-recent-file.svg?style=flat

[depstat-url]: https://david-dm.org/maurizzzio/most-recent-file
[depstat-image]: https://david-dm.org/maurizzzio/most-recent-file.svg?style=flat

[download-image]: http://img.shields.io/npm/dm/most-recent-file.svg?style=flat

[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: http://standardjs.com/

