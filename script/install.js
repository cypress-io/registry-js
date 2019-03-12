const path = require('path')
const { spawnSync, execSync } = require('child_process')
const { unlinkSync, renameSync } = require('fs')

function log(msg) {
  console.log(`[registry-js/script/install.js] ${msg}`)
}

function prebuild(/** args */) {
  tryUnlink('prebuilds')
  return spawnSync(
    path.join(
      __dirname,
      '../node_modules/.bin/prebuild' +
      (process.platform === 'win32' ? '.cmd' : '')
    ),
    Array.prototype.slice.call(arguments),
    { stdio: 'inherit' }
  )
}

function tryUnlink(fn) {
  try {
    execSync(`rmdir ${fn} /s /q`, { stdio: 'ignore' })
  } catch (e) { }
}

if (process.platform !== 'win32') {
  log(`Nothing to do on ${process.platform}`)
  process.exit(0)
}

log('Cleaning up old builds');
['build', 'build-node', 'build-electron', 'prebuilds'].map(tryUnlink)

log('Building for the expected nodejs version')
prebuild('-t', '8.2.1', '-r', 'node', '--strip')
renameSync('build', 'build-node')

log('Building for the bundled electron version')
prebuild('-t', '1.8.2', '-r', 'electron', '--strip')
renameSync('build', 'build-electron')

log('Building for the installed nodejs version')
prebuild('--strip')