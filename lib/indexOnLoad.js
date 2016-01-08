'use strict'

function indexOnLoad(file, next) {
  if (file.content === '') {
    file.content = ' '
  }
  next()
}

module.exports = indexOnLoad
