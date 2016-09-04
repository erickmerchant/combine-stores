const set = require('lodash.set')
const get = require('lodash.get')

module.exports = function (stores) {
  const map = new Map()

  stores(add)

  return store

  function add (prop, store) {
    map.set(prop, store)
  }

  function store (state, prop, ...args) {
    if (!state) {
      state = {}

      map.forEach(function (store, prop) {
        const val = store(undefined, ...args)

        set(state, prop, val)
      })
    }

    if (prop) {
      const store = map.get(prop)

      const previous = get(state, prop, undefined)

      const val = store(previous, ...args)

      set(state, prop, val)
    }

    return state
  }
}
