'use strict'

const front = require('yaml-front-matter')

function contact(options) {
  const hash = options.hash || {}
  const coworker = hash.coworker
  const subject = escape(hash.subject || '')

  if (!coworker) {
    throw new Error('missing .coworker to contact')
  }

  const frontmatter = front.loadFront(`./src/pages/team/${coworker}/index.hbs`)
  const email = frontmatter.email
  if (!email) {
    throw new Error(`${coworker} does not have an email`)
  }

  return `mailto:${email}?subject=${subject}`
}

module.exports = contact
