# @erickmerchant/state-container

Meant to be used with [@erickmerchant/framework](https://github.com/erickmerchant/framework), it can be used to construct a store that's easy to organize. It defines a state that is an object and each store that you define handles a single property on that object.

``` javascript
/* an example */

const framework = require('@erickmerchant/framework')

/* here is the relevant stuff */

const container = require('@erickmerchant/state-container')

const store = container(function (define) {
  define('errors', require('./stores/errors'))
  define('fetchingCount', require('./stores/fetching-count'))
  define('tasks', require('./stores/tasks'))
})

/* end relevant */

const component = require('./component.js')

const target = document.querySelector('main')

const yo = require('yo-yo')
const diff = yo.update

framework({target, store, component, diff})
```

## API Reference

### container

_container((define) => { ... })_

The function exported by this module.

- [define](#define)

### define

_define(property, store)_

- property: the property that the store will handle
- store: [a store](https://github.com/erickmerchant/framework#store). When it is called it is only passed the property that it handles as the first argument. When called with no arguments it should return the default for that property.
