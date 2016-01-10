'use strict'

const front = require('yaml-front-matter')
const slugify = require('./slugify')

function selectedCases(options) {
  const hash = options.hash || {}
  const cases = hash.cases || []
  const defaultCase = hash.default || null
  const data = []

  if (defaultCase) {
    data.push(defaultCase)
  }

  cases.forEach(caseName => {
  	const frontmatter = front
      .loadFront(`./src/pages/case/${caseName}/index.hbs`)

  	frontmatter.url = caseName.toLowerCase()
    frontmatter.classes = ''

    if (frontmatter.categories ) {
      frontmatter.categories.forEach(category => {
        frontmatter.classes += ` ${slugify(category)}`
      })
    }

  	data.push(frontmatter)
  })

  return options.fn({
    data,
    count: data.length
  })
}

module.exports = selectedCases
