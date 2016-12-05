module.exports = function (stores) {
  const reducers = new Map()

  stores(add)

  return store

  function add (prop, store) {
    reducers.set(prop, store)
  }

  function store (state, prop, ...args) {
    if (state == null) {
      state = {}

      reducers.forEach(function (store, prop) {
        const val = store(undefined, ...args)

        state[prop] = val
      })
    }

    if (prop != null && reducers.has(prop)) {
      const store = reducers.get(prop)

      const previous = state[prop]

      const val = store(previous, ...args)

      state[prop] = val
    }

    return state
  }
}
