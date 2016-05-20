'use strict'

const front = require('yaml-front-matter')
const gravatar = require('./gravatar')

function employee(options) {
  const data = options.hash || {}

  const size = 400 || data.size
  const frontmatter = front
    .loadFront(`./src/pages/team/${data.name}/index.hbs`)

  frontmatter.image = gravatar(frontmatter.email, size)
  frontmatter.firstName = frontmatter
    .name
    .substr(0, frontmatter.name.indexOf(' '))

  return options.fn({
    employee: frontmatter
  })
}

module.exports = employee
