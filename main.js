module.exports = function (stores) {
  const reducers = {}

  stores(add)

  return store

  function add (prop, store) {
    let stores = []

    if (reducers[prop] != null) {
      stores = reducers[prop]
    }

    stores.push(store)

    reducers[prop] = stores
  }

  function store (state, prop, ...args) {
    if (state == null) {
      state = {}

      Object.keys(reducers).forEach(function (prop) {
        reduce(reducers[prop], prop)
      })
    } else if (reducers[prop] != null) {
      const stores = reducers[prop]

      reduce(stores, prop, state[prop])
    }

    return state

    function reduce (stores, prop, initial) {
      state[prop] = stores.reduce((val, store) => store(val, ...args), initial)
    }
  }
}
