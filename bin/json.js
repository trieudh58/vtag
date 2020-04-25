const cp = require('child_process')

module.exports = {
  updateLatestVersion,
  updateListVersions,
  updatePackageJson,
}

function updatePackageJson(sha) {
  updateLatestVersion(sha)
  updateListVersions(sha)
}

function updateLatestVersion(sha) {
  const evalCmd = `this.appLatestVersion='${sha}'`
  cp.execSync(`json -q -I -f package.json -e "${evalCmd}"`)
}

function updateListVersions(sha) {
  const evalCmd = `this.appVersions=[...(Array.isArray(this.appVersions) ? this.appVersions : []), '${sha}']`
  cp.execSync(`json -q -I -f package.json -e "${evalCmd}"`)
}
