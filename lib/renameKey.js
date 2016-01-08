'use strict'

const path = require('path')

function renameKey(fp) {
  let key
  if (path.dirname(fp).match(/src\/pages/) === null) {
    key = path.basename(fp, path.extname(fp))
  } else {
    key = path
      .join(path.dirname(fp), path.basename(fp, path.extname(fp)))
      .replace(`${__dirname}/src/pages/`, '')
  }
  return key
}

module.exports = renameKey
