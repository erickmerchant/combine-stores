var test = require('tape')

test('test main', function (t) {
  t.plan(3)

  const main = require('./main')

  const store = main(function (add) {
    add('count', function (state, action) {
      if (state == null) {
        state = 0
      }

      if (action === 'increment') {
        state += 1
      }

      if (action === 'decrement') {
        state -= 1
      }

      return state
    })
  })

  t.deepEqual(store(), {count: 0})

  t.deepEqual(store({count: 5}, 'count', 'increment'), {count: 6})

  t.deepEqual(store({count: 5}, 'count', 'decrement'), {count: 4})
})
