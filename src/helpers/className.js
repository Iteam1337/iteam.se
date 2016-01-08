'use strict'

function className(name) {
  return name
    .replace(/[^\w\d]/g, '')
    .replace(/^(\d){1,}/, '')
}

module.exports = className
