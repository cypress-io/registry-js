const path = require('path')
const { spawnSync, execSync } = require('child_process')
const { unlinkSync, renameSync } = require('fs')

function log(msg) {
  console.log(`[registry-js/script/prebuild-install.js] ${msg}`)
}

process.chdir(path.join(__dirname, '..'))

function prebuildInstall(cmdline) {
  try {
    const cmd = path.join(
      (__dirname.indexOf('node_modules') !== -1 ? __dirname.split('node_modules')[0] : _dirname + '/..'),
      'node_modules/.bin/prebuild-install' + (process.platform === 'win32' ? '.cmd' : '')
    ) + ' ' + cmdline
    log('Running ' + cmd)
    return execSync(
      cmd,
      { stdio: 'inherit' }
    )
  } catch (e) {
    log('Exiting because of failed prebuild-install step')
    process.exit(1)
  }
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

log('Cleaning up old installs');
['build', 'build-node', 'build-electron', 'prebuilds'].map(tryUnlink)

log('Installing for node 8.2.1')
prebuildInstall('-t 8.2.1 -r node --verbose')
renameSync('build', 'build-node')

log('Installing for electron 1.8.2')
prebuildInstall('-t 1.8.2 -r electron --verbose')
renameSync('build', 'build-electron')

log('Installing for system node')
prebuildInstall('--verbose')
