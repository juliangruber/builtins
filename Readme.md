
# builtins

  List of node.js [builtin modules](http://nodejs.org/api/).

  [![build status](https://secure.travis-ci.org/juliangruber/builtins.svg)](http://travis-ci.org/juliangruber/builtins)

## Example

Get list of core modules for current Node.js version:

```js
var builtins = require('builtins')()

assert(builtins.indexOf('http') > -1)
```

Get list of core modules for specific Node.js version:

```js
var builtins = require('builtins')('6.0.0')

assert(builtins.indexOf('http') > -1)
```

## License

  MIT
