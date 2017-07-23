const test = require('tape')

test('test simple case', function (t) {
  t.plan(3)

  const main = require('./main')

  const store = main(function (add) {
    add('count', function (seed) {
      seed(0)

      return function (commit, action) {
        if (action === 'increment') {
          commit((state) => state + 1)
        }

        if (action === 'decrement') {
          commit((state) => state - 1)
        }
      }
    })
  })

  const action = store(function (seed) {
    t.deepEqual(seed(), {count: 0})
  })

  action(function (current) {
    t.deepEqual(current({count: 5}), {count: 6})
  }, 'count', 'increment')

  action(function (current) {
    t.deepEqual(current({count: 5}), {count: 4})
  }, 'count', 'decrement')
})

test('test complex case', function (t) {
  t.plan(3)

  const main = require('./main')

  const store = main(function (add) {
    add('count', function (seed) {
      seed(function (commit) {
        return 0
      })

      return function (commit, action) {
        if (action === 'increment') {
          commit((state) => state + 1)
        }

        if (action === 'decrement') {
          commit((state) => state - 1)
        }
      }
    })
  })

  const action = store(function (seed) {
    t.deepEqual(seed(), {count: 0})
  })

  action(function (current) {
    t.deepEqual(current({count: 5}), {count: 6})
  }, 'count', 'increment')

  action(function (current) {
    t.deepEqual(current({count: 5}), {count: 4})
  }, 'count', 'decrement')
})
