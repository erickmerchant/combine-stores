const set = require('lodash.set')
const get = require('lodash.get')

module.exports = function (stores) {
  const map = new Map()
  const state = {}

  stores(add)

  return store

  function add (prop, store) {
    map.set(prop, store)

    set(state, prop, store())
  }

  function store (prop) {
    if (prop) {
      const store = map.get(prop)

      const previous = get(state, prop, undefined)

      const args = []

      for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
      }

      const val = store(previous, ...args)

      set(state, prop, val)
    }

    return state
  }
}
