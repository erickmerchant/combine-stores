module.exports = function (stores) {
  const reducers = new Map()

  stores(add)

  return store

  function add (prop, store) {
    let stores = []

    if (reducers.has(prop)) {
      stores = reducers.get(prop)
    }

    stores.push(store)

    reducers.set(prop, stores)
  }

  function store (state, prop, ...args) {
    if (state == null) {
      state = {}

      reducers.forEach(function (stores, prop) {
        reduce(stores, prop)
      })
    } else if (reducers.has(prop)) {
      const stores = reducers.get(prop)

      reduce(stores, prop, state[prop])
    }

    return state

    function reduce (stores, prop, initial) {
      state[prop] = stores.reduce((val, store) => store(val, ...args), initial)
    }
  }
}
