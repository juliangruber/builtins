'use strict'

var test = require('tape')
var builtins = require('./')

test('freelist', function (t) {
  t.ok(builtins('5.99.99').indexOf('freelist') !== -1)
  t.ok(builtins('6.0.0').indexOf('freelist') === -1)
  t.end()
})

test('v8', function (t) {
  t.ok(builtins('0.99.99').indexOf('v8') === -1)
  t.ok(builtins('1.0.0').indexOf('v8') !== -1)
  t.end()
})

test('process', function (t) {
  t.ok(builtins('1.0.99').indexOf('process') === -1)
  t.ok(builtins('1.1.0').indexOf('process') !== -1)
  t.end()
})

test('async_hooks', function (t) {
  t.ok(builtins('8.0.99').indexOf('async_hooks') === -1)
  t.ok(builtins('8.1.0').indexOf('async_hooks') !== -1)
  t.end()
})

test('http2', function (t) {
  t.ok(builtins('8.3.99').indexOf('http2') === -1)
  t.ok(builtins('8.4.0').indexOf('http2') !== -1)
  t.end()
})

test('perf_hooks', function (t) {
  t.ok(builtins('8.4.99').indexOf('perf_hooks') === -1)
  t.ok(builtins('8.5.0').indexOf('perf_hooks') !== -1)
  t.end()
})

test('node 0.12.0 count', function (t) {
  t.equal(builtins('0.12.0').length, 33)
  t.end()
})

test('node 8.5.0 count', function (t) {
  t.equal(builtins('8.5.0').length, 37)
  t.end()
})

test('default to current version', function (t) {
  builtins().forEach(function (name) {
    t.ok(require(name), name)
  })
  t.end()
})
