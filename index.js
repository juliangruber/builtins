'use strict'

var semver = require('semver')

module.exports = function ({
  version = process.version,
  experimental = false
} = {}) {
  var coreModules = [
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

  const versionLockedModules = {
    freelist: '<6.0.0',
    v8: '>=1.0.0',
    process: '>=1.1.0',
    inspector: '>=8.0.0',
    async_hooks: '>=8.1.0',
    http2: '>=8.4.0',
    perf_hooks: '>=8.5.0',
    trace_events: '>=10.0.0',
    worker_threads: '>=12.0.0'
  }

  for (const [name, semverRange] of Object.entries(versionLockedModules)) {
    if (version === '*' || semver.satisfies(version, semverRange)) {
      coreModules.push(name)
    }
  }

  const experimentalModules = {
    worker_threads: '>=10.5.0',
    wasi: '>=12.16.0',
    diagnostics_channel: '^14.17.0 || >=15.1.0'
  }

  if (experimental) {
    for (const [name, semverRange] of Object.entries(experimentalModules)) {
      if (
        !coreModules.includes(name) &&
        (version === '*' || semver.satisfies(version, semverRange))
      ) {
        coreModules.push(name)
      }
    }
  }

  return coreModules
}
