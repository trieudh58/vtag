#!/usr/bin/env node
const yargs = require('yargs')

const { updatePackageJson } = require('./json')
const { generateTimeBasedShortSHA, getGitShortSHA } = require('./sha')

const argv = yargs.option('tagger', {
  alias: 't',
  type: 'string',
  default: 'default',
  choices: ['git', 'default'],
  description: 'Choose a tagger',
}).argv

main()

function main() {
  let sha
  if (argv.tagger === 'git') {
    sha = getGitShortSHA()
    if (!sha) {
      console.log('===> Cannot read last commit SHA from Git')
      console.log('===> Terminated. Nothing changes')
      return
    }
  } else {
    sha = generateTimeBasedShortSHA()
  }
  
  updatePackageJson(sha)
  console.log('===> App version updated in package.json')
}
