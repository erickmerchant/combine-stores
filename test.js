const test = require('tape')

test('test simple case', function (t) {
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

test('test complex case', function (t) {
  t.plan(5)

  const main = require('./main')

  const store = main(function (add) {
    add('count', function (state, action, number) {
      if (state == null) {
        state = 0
      }

      if (action === 'add') {
        state += number
      }

      if (action === 'subtract') {
        state -= number
      }

      return state
    })

    add('count', function (state, action, number) {
      if (state == null) {
        state = 0
      }

      if (action === 'multiply') {
        state *= number
      }

      if (action === 'divide') {
        state /= number
      }

      return state
    })
  })

  t.deepEqual(store(), {count: 0})

  t.deepEqual(store({count: 5}, 'count', 'add', 5), {count: 10})

  t.deepEqual(store({count: 5}, 'count', 'subtract', 5), {count: 0})

  t.deepEqual(store({count: 5}, 'count', 'multiply', 5), {count: 25})

  t.deepEqual(store({count: 5}, 'count', 'divide', 5), {count: 1})
})
