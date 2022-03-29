'use strict'

var test = require('tape')
var builtins = require('./')

test('freelist', function (t) {
  t.ok(builtins({ version: '5.99.99' }).indexOf('freelist') !== -1)
  t.ok(builtins({ version: '6.0.0' }).indexOf('freelist') === -1)
  t.end()
})

test('v8', function (t) {
  t.ok(builtins({ version: '0.99.99' }).indexOf('v8') === -1)
  t.ok(builtins({ version: '1.0.0' }).indexOf('v8') !== -1)
  t.end()
})

test('process', function (t) {
  t.ok(builtins({ version: '1.0.99' }).indexOf('process') === -1)
  t.ok(builtins({ version: '1.1.0' }).indexOf('process') !== -1)
  t.end()
})

test('async_hooks', function (t) {
  t.ok(builtins({ version: '8.0.99' }).indexOf('async_hooks') === -1)
  t.ok(builtins({ version: '8.1.0' }).indexOf('async_hooks') !== -1)
  t.end()
})

test('http2', function (t) {
  t.ok(builtins({ version: '8.3.99' }).indexOf('http2') === -1)
  t.ok(builtins({ version: '8.4.0' }).indexOf('http2') !== -1)
  t.end()
})

test('perf_hooks', function (t) {
  t.ok(builtins({ version: '8.4.99' }).indexOf('perf_hooks') === -1)
  t.ok(builtins({ version: '8.5.0' }).indexOf('perf_hooks') !== -1)
  t.end()
})

test('node 0.12.0 count', function (t) {
  t.equal(builtins({ version: '0.12.0' }).length, 33)
  t.end()
})

test('node 8.5.0 count', function (t) {
  t.equal(builtins({ version: '8.5.0' }).length, 38)
  t.end()
})

test('worker_threads', function (t) {
  t.notOk(builtins({ version: '8.5.0' }).includes('worker_threads'))
  t.notOk(builtins({ version: '10.5.0' }).includes('worker_threads'))
  t.ok(
    builtins({ version: '10.5.0', experimental: true }).includes(
      'worker_threads'
    )
  )
  t.ok(builtins({ version: '12.0.0' }).includes('worker_threads'))
  t.end()
})

test('wasi', function (t) {
  t.notOk(builtins({ version: '12.16.0' }).includes('wasi'))
  t.ok(builtins({ version: '12.16.0', experimental: true }).includes('wasi'))
  t.end()
})

test('diagnostics_channel', function (t) {
  t.notOk(
    builtins({ version: '15.0.0', experimental: true }).includes(
      'diagnostics_channel'
    )
  )
  t.notOk(builtins({ version: '15.1.0' }).includes('diagnostics_channel'))
  t.ok(
    builtins({ version: '15.1.0', experimental: true }).includes(
      'diagnostics_channel'
    )
  )
  t.ok(
    builtins({ version: '15.2.0', experimental: true }).includes(
      'diagnostics_channel'
    )
  )

  t.notOk(builtins({ version: '14.17.0' }).includes('diagnostics_channel'))
  t.notOk(
    builtins({ version: '14.16.0', experimental: true }).includes(
      'diagnostics_channel'
    )
  )
  t.ok(
    builtins({ version: '14.17.0', experimental: true }).includes(
      'diagnostics_channel'
    )
  )
  t.ok(
    builtins({ version: '14.18.0', experimental: true }).includes(
      'diagnostics_channel'
    )
  )

  t.end()
})

test('default to current version', function (t) {
  builtins().forEach(function (name) {
    t.ok(require(name), name)
  })
  t.end()
})

test('returns all builtins with version *', function (t) {
  t.equal(builtins({ version: '*' }).length, 32 + 9)
  t.equal(builtins({ version: '*', experimental: true }).length, 32 + 9 + 2)
  t.end()
})
