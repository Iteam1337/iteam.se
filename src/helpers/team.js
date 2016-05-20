'use strict'

const front = require('yaml-front-matter')
const gravatar = require('./gravatar')

function team(dataOption, options) {
  const size = dataOption['gravatar-sizes']
  const data = dataOption.team.map(coworker => {
    const frontmatter = front
      .loadFront(`./src/pages/team/${coworker}/index.hbs`)
    const imgSize = size || false

    const name = (frontmatter.name || ' ').split(' ')
    return {
      frontmatter,
      logo: gravatar(frontmatter.email, imgSize),
      url: `/team/${coworker}`,
      size: size || 300,
      name: {
        first: name[0] || '',
        last: name[1] || ''
      }
    }
  })

  return options.fn({
    data
  })
}

module.exports = team
