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

      reducers.forEach((stores, prop) => {
        state[prop] = stores.reduce((val, store) => store(val, ...args), undefined)
      })
    }

    if (reducers.has(prop)) {
      const stores = reducers.get(prop)

      state[prop] = stores.reduce((val, store) => store(val, ...args), state[prop])
    }

    return state
  }
}
