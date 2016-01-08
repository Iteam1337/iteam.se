const fs = require('fs')

function directory(dir) {
  // Load all cases from folder
  return fs.readdirSync(dir).filter(file =>
    fs.statSync(dir + file).isDirectory())
}

module.exports = directory
