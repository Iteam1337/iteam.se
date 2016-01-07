'use strict'

const marked = require('marked')
const fs = require('fs')
const path = require('path')

function md(filePath, options) {
  let dirName

  try {
    dirName = path.dirname(options.data.orig.files[0].src)
  } catch (error) {
    dirName = process.cwd()
  }

  if (filePath.indexOf('/') === -1) {
    filePath = path.join(dirName, filePath)
  }

  if (filePath.substr(-3) !== '.md') {
    filePath += '.md'
  }

  let text
  try {
    text = fs.readFileSync(filePath, 'utf8')
  } catch (e) {
    return `Markdown text does not exist at path: ${filePath}`
  }

  return marked(text)
}

module.exports = md
module.exports.md = md
