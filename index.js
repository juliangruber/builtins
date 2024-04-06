'use strict'

const satisfies = require('semver/functions/satisfies')

const permanentModules = [
  'assert',
  'buffer',
  'child_process',
  'cluster',
  'console',
  'constants',
  'crypto',
  'dgram',
  'dns',
  'domain',
  'events',
  'fs',
  'http',
  'https',
  'module',
  'net',
  'os',
  'path',
  'punycode',
  'querystring',
  'readline',
  'repl',
  'stream',
  'string_decoder',
  'sys',
  'timers',
  'tls',
  'tty',
  'url',
  'util',
  'vm',
  'zlib'
]

const versionLockedModules = [
  'node:test', 'worker_threads', 'trace_events', 'perf_hooks', 'http2', 'async_hooks', 'inspector', 'process', 'v8'
]
const versionLockedModulesRange = [
  '>=18.0.0', '>=12.0.0', '>=10.0.0', '>=8.5.0', '>=8.4.0', '>=8.1.0', '>=8.0.0', '>=1.1.0', '>=1.0.0'
]

const experimentalModulesRanges = [
  '^14.17.0 || >=15.1.0', '>=12.16.0', '>=10.5.0'
]
const experimentalModules = ['diagnostics_channel', 'wasi', 'worker_threads']

module.exports = ({ version = process.version, experimental = false } = {}) => {
  const builtins = permanentModules.slice()

  for (let i = 0; i < versionLockedModulesRange.length; i++) {
    if (version === '*' || satisfies(version, versionLockedModulesRange[i])) {
      Array.prototype.push.apply(builtins, versionLockedModules.slice(i))
      break
    }
  }

  if (version === '*' || satisfies(version, '<6.0.0')) {
    builtins.push('freelist')
  }

  if (experimental) {
    for (let i = 0; i < experimentalModulesRanges.length; i++) {
      const name = experimentalModules[i]
      if (
        !builtins.includes(name) &&
        (version === '*' || satisfies(version, experimentalModulesRanges[i]))
      ) {
        builtins.push(name)
      }
    }
  }

  return builtins
}
