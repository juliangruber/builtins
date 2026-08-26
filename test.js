import assert from 'node:assert'
import { createRequire } from 'node:module'
import { test } from 'node:test'

import builtins from './dist/index.js'

test('freelist', () => {
  assert(builtins({ version: '5.99.99' }).includes('freelist'))
  assert(!builtins({ version: '6.0.0' }).includes('freelist'))
})

test('v8', () => {
  assert(!builtins({ version: '0.99.99' }).includes('v8'))
  assert(builtins({ version: '1.0.0' }).includes('v8'))
})

test('process', () => {
  assert(!builtins({ version: '1.0.99' }).includes('process'))
  assert(builtins({ version: '1.1.0' }).includes('process'))
})

test('async_hooks', () => {
  assert(!builtins({ version: '8.0.99' }).includes('async_hooks'))
  assert(builtins({ version: '8.1.0' }).includes('async_hooks'))
})

test('http2', () => {
  assert(!builtins({ version: '8.3.99' }).includes('http2'))
  assert(builtins({ version: '8.4.0' }).includes('http2'))
})

test('perf_hooks', () => {
  assert(!builtins({ version: '8.4.99' }).includes('perf_hooks'))
  assert(builtins({ version: '8.5.0' }).includes('perf_hooks'))
})

test('node 0.12.0 count', () => {
  assert.strictEqual(builtins({ version: '0.12.0' }).length, 33)
})

test('node 8.5.0 count', () => {
  assert.strictEqual(builtins({ version: '8.5.0' }).length, 38)
})

test('worker_threads', () => {
  assert(!builtins({ version: '8.5.0' }).includes('worker_threads'))
  assert(!builtins({ version: '10.5.0' }).includes('worker_threads'))
  assert(
    builtins({ version: '10.5.0', experimental: true }).includes(
      'worker_threads'
    )
  )
  assert(builtins({ version: '12.0.0' }).includes('worker_threads'))
})

test('wasi', () => {
  assert(!builtins({ version: '12.16.0' }).includes('wasi'))
  assert(builtins({ version: '12.16.0', experimental: true }).includes('wasi'))
})

test('diagnostics_channel', () => {
  assert(
    !builtins({ version: '15.0.0', experimental: true }).includes(
      'diagnostics_channel'
    )
  )
  assert(!builtins({ version: '15.1.0' }).includes('diagnostics_channel'))
  assert(
    builtins({ version: '15.1.0', experimental: true }).includes(
      'diagnostics_channel'
    )
  )
  assert(
    builtins({ version: '15.2.0', experimental: true }).includes(
      'diagnostics_channel'
    )
  )

  assert(!builtins({ version: '14.17.0' }).includes('diagnostics_channel'))
  assert(
    !builtins({ version: '14.16.0', experimental: true }).includes(
      'diagnostics_channel'
    )
  )
  assert(
    builtins({ version: '14.17.0', experimental: true }).includes(
      'diagnostics_channel'
    )
  )
  assert(
    builtins({ version: '14.18.0', experimental: true }).includes(
      'diagnostics_channel'
    )
  )
})

test('default to current version', () => {
  const require = createRequire(import.meta.url)
  for (const name of builtins()) {
    assert(require(name), name)
  }
})

test('returns all builtins with version *', () => {
  assert.strictEqual(builtins({ version: '*' }).length, 42)
  assert.strictEqual(builtins({ version: '*', experimental: true }).length, 44)
})
