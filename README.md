# pub-sub-store

![Build Status](https://travis-ci.com/n0n3br/pub-sub-store.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/n0n3br/pub-sub-store/badge.svg)](https://coveralls.io/github/n0n3br/pub-sub-store)

pub-sub-store is a small state manager store that can be used to manage application state providing reactivity through subscription method.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install pub-sub-store

```bash
npm install @n0n3br/pub-sub-store
```

## Features

- Centralized state management
- Protected state (can't be mutated directly)
- setState method to mutate state and trigger subscribers callbacks
- subscribe method to watch and react to desired state changes

## Usage

You need just three steps to start using pub-sub-store

1. Create the Store

```javascript
const store = new Store(); // empty state or
const otherStore = new Store({ name: 'Rogerio' }); // optional initial state
```

2. Subscribe to store changes

```javascript
// the subscribe method requires two parameters:
// 1. a callback function that will be called when the state changes
// 2. a configuration function that describes wich state mutations should be watched
//    and returned to the callback function
// both parameters are functions that receive the state

const callbackFunction = state => console.log(`Received state : ${JSON.stringify(state)}`);

// only changes to the state.name attribute will be watched
const configurationFunction = state => {
  return {
    name: state.name,
  };
};

store.subscribe(callbackFunction, configurationFunction);
```

3. Mutate the state

```javascript
store.setState({ name: 'Rogerio', age: 44 });
```

## Examples

There are two examples in the examples folder in this repository, one for nodejs and other for the browser.

#### ES6

```javascript
import Store from '@n0n3br/pub-sub-store';
const store = new Store({ a: 1, b: 3 });
console.log(store.state);
const callback = state => console.log(`a value changed to ${state.a}`);
const config = state => {
  return { a: state.a };
};
subscribe(fn, config);

store.setState({ a: 2 });
```

#### CommonJS

```javascript
var Store = require('@n0n3br/pub-sub-store').default;
var store = new Store();
var callback = function(state) {
  console.log(`received state : ${JSON.stringify(state)}`);
};
var config = function(state) {
  return { a: state.a };
};
store.subscribe(callback, config);
store.setState({ a: 2 });
```

#### UMD in Browser

```html
<!-- to import non-minified version -->
<script src="pub-sub-store.umd.js"></script>

<!-- to import minified version -->
<script src="pub-sub-store.umd.min.js"></script>
```

After this the library will be available to the Global as pubSubStore:

```javascript
const store = new pubSubStore({ a: 1, b: 3 });
console.log(store.state);
const callback = state => console.log(`a value changed to ${state.a}`);
const config = state => {
  return { a: state.a };
};
subscribe(fn, config);
store.setState({ a: 2 });
```

## Running the tests

This library contains all tests in the tests folder.

The tests are writen using [mocha](https://github.com/mochajs/mocha), [chai](https://github.com/chaijs/chai), [sinon](https://github.com/sinonjs/sinon) and [sinon-chai](https://github.com/domenic/sinon-chai).

To run the tests just use nodejs test script:

```javascript
npm run test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

| ![Rogério Amorim](https://avatars2.githubusercontent.com/u/371808?s=100&v=4) |
| :--------------------------------------------------------------------------: |
|                 [Rogério Amorim](https://github.com/n0n3br)                  |

See also the list of [contributors](https://github.com/n0n3br/pub-sub-store/graphs/contributors) who participated in this project.

## License

[MIT](https://choosealicense.com/licenses/mit/)
