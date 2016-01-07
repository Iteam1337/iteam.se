'use strict'

const Handlebars = require('handlebars')
const fs = require('fs')
const files = require('./files')
const path = require('path')

function dynamicPartial(options) {
  const data = options.hash.partial || {}

  if (!data.type) {
    return 'No type defined'
  }

  const partials = {}
  const dirPath = './src/partials/'

  files(dirPath)
    .forEach(file => {
      const partial = fs.readFileSync(dirPath + file, 'utf8')
      partials[path.basename(file, '.hbs')] = partial
    })

  const html = partials[data.type]

  if (typeof html === 'function') {
    console.log(data)
    console.log(html())
    return 'Partial defined as function'
  }

  if (!html) {
    return 'No partial exists'
  }

  return Handlebars.compile(html)(data, options)
}

module.exports = dynamicPartial
module.exports.dynamicPartial = dynamicPartial
