const path = require('path')
const { spawnSync, execSync } = require('child_process')
const { unlinkSync, renameSync } = require('fs')

function log(msg) {
  console.log(`[registry-js/script/prebuild-install.js] ${msg}`)
}

process.chdir(path.join(__dirname, '..'))

function prebuildInstall(cmdline) {
  return spawnSync(
    path.join(
      'node_modules/.bin/prebuild-install' +
      (process.platform === 'win32' ? '.cmd' : '')
    ),
    cmdline.split(' '),
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

log('Cleaning up old installs');
['build', 'build-node', 'build-electron', 'prebuilds'].map(tryUnlink)

log('Installing for node 8.2.1')
prebuildInstall('-t 8.2.1 -r node')
renameSync('build', 'build-node')

log('Installing for electron 1.8.2')
prebuildInstall('-t 1.8.2 -r electron')
renameSync('build', 'build-electron')

log('Installing for system node')
prebuildInstall()
