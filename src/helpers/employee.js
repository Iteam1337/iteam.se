'use strict'

var front = require('yaml-front-matter')
var image = require('./gravatar')

module.exports.employee = function (options) {
  var data = options.hash || {}

  var size = 400 || data.size
  var frontmatter = front.loadFront('./src/pages/coworkers/' + data.name + '/index.hbs')

  frontmatter.image = image.gravatar(frontmatter.email, size)
  frontmatter.firstName = frontmatter.name.substr(0, frontmatter.name.indexOf(' '))

  return options.fn({ employee: frontmatter })
}
