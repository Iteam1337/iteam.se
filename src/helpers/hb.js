'use strict'

const front = require('yaml-front-matter')
const Handlebars = require('handlebars')

function hb(path, options) {
  if (path.match(/^\//) !== null) {
    path = `.${path}`
  }
  if (path.match(/\.hbs$/i) === null) {
    path += '.hbs'
  }

  var content = front.loadFront(path).__content

  if (!content) {
    return 'File does not exist'
  }

  return Handlebars.compile(content)()
}

module.exports = hb
module.exports.hb = hb
