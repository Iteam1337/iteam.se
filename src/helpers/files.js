'use strict'

const fs = require('fs')

function files(dir) {
  // Load all cases from folder
  return fs.readdirSync(dir).filter(file =>
    fs.statSync(dir + file).isFile())
}

module.exports = files
module.exports.files = files
