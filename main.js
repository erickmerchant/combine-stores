module.exports = function (adder) {
  const reducers = {}

  adder(add)

  return store

  function add (prop, store) {
    reducers[prop] = store
  }

  function store (seed) {
    seed(function (commit) {
      const state = {}

      Object.keys(reducers).forEach(function (prop) {
        reducers[prop] = reducers[prop](function (seed) {
          if (typeof seed === 'function') {
            state[prop] = seed(commit)
          } else {
            state[prop] = seed
          }
        })
      })

      return state
    })

    return function (commit, prop, ...args) {
      if (reducers[prop] != null) {
        reducers[prop](function (current) {
          commit(function (state) {
            state[prop] = current(state[prop])

            return state
          })
        }, ...args)
      }
    }
  }
}
