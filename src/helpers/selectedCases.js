'use strict'

var front = require('yaml-front-matter')
var pages = require('./pages')
var slugify = require('./slugify')

module.exports = function selectedCases(options) {
  var data = options.hash || {}
  var cases = data.cases || []
  var fmSelectedCases = []

  cases.forEach(function (caseName) {
  	var frontmatter = front
      .loadFront('./src/pages/case/' + caseName + '/index.hbs')

  	frontmatter.url = caseName.toLowerCase()
    frontmatter.classes = ''

    if (frontmatter.categories ) {
      frontmatter.categories.forEach(function (category) {
        frontmatter.classes += ' ' + slugify(category)
      })
    }

  	fmSelectedCases.push(frontmatter)
  })

  return options.fn({
    data: fmSelectedCases
  })
}
