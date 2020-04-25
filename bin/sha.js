const cp = require('child_process')
const crypto = require('crypto')

module.exports = {
  getGitShortSHA,
  generateTimeBasedShortSHA,
}

function getGitShortSHA() {
  try {
    return cp
      .execSync('git log -1 --pretty=%h', { stdio: null })
      .toString()
      .trim()
  } catch {
    return null
  }
}

function generateTimeBasedShortSHA() {
  const buf = Buffer.from(new Date().getTime().toString())
  const sha = crypto.createHash('sha1').update(buf).digest('hex')
  return sha.slice(0, 7)
}
