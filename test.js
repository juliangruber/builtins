'use strict'

const test = require('tape')
const builtins = require('./')

test('freelist', t => {
  t.ok(builtins({ version: '5.99.99' }).includes('freelist'))
  t.notOk(builtins({ version: '6.0.0' }).includes('freelist'))
  t.end()
})

test('v8', t => {
  t.notOk(builtins({ version: '0.99.99' }).includes('v8'))
  t.ok(builtins({ version: '1.0.0' }).includes('v8'))
  t.end()
})

test('process', t => {
  t.notOk(builtins({ version: '1.0.99' }).includes('process'))
  t.ok(builtins({ version: '1.1.0' }).includes('process'))
  t.end()
})

test('async_hooks', t => {
  t.notOk(builtins({ version: '8.0.99' }).includes('async_hooks'))
  t.ok(builtins({ version: '8.1.0' }).includes('async_hooks'))
  t.end()
})

test('http2', t => {
  t.notOk(builtins({ version: '8.3.99' }).includes('http2'))
  t.ok(builtins({ version: '8.4.0' }).includes('http2'))
  t.end()
})

test('perf_hooks', t => {
  t.notOk(builtins({ version: '8.4.99' }).includes('perf_hooks'))
  t.ok(builtins({ version: '8.5.0' }).includes('perf_hooks'))
  t.end()
})

test('node 0.12.0 count', t => {
  t.equal(builtins({ version: '0.12.0' }).length, 33)
  t.end()
})

test('node 8.5.0 count', t => {
  t.equal(builtins({ version: '8.5.0' }).length, 38)
  t.end()
})

test('worker_threads', t => {
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

test('wasi', t => {
  t.notOk(builtins({ version: '12.16.0' }).includes('wasi'))
  t.ok(builtins({ version: '12.16.0', experimental: true }).includes('wasi'))
  t.end()
})

test('diagnostics_channel', t => {
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

test('default to current version', t => {
  for (const name of builtins()) {
    t.ok(require(name), name)
  }
  t.end()
})

test('returns all builtins with version *', t => {
  t.equal(builtins({ version: '*' }).length, 32 + 9)
  t.equal(builtins({ version: '*', experimental: true }).length, 32 + 9 + 2)
  t.end()
})
