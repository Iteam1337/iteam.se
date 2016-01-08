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

  const content = front.loadFront(path).__content

  if (!content) {
    return 'File does not exist'
  }

  let compiled
  try {
    compiled = Handlebars.compile(content)()
  } catch (error) {
    console.error(error)
    compiled = content
  }
  return compiled
}

module.exports = hb
