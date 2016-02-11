'use strict'

const front = require('yaml-front-matter')
const directory = require('./directory')

function categories(_, options) {
  const dir = './src/pages/cases/'
  const dirs = directory(dir)
  const fmCategories = []

  dirs
    .forEach(folder => {
      const frontmatter = front.loadFront(`${dir}${folder}/index.hbs`)

      if (!frontmatter.categories) {
        return
      }

      frontmatter
        .categories
        .forEach(category => {
          if (category) {
            fmCategories.push(category)
          }
        })
    })

  const data = fmCategories
    .reduce((result, element) => {
      if (result[element]) {
        result[element].hits++
      } else {
        result[element] = {
          hits: 1
        }
      }

      result[element].visible = result[element].hits > 1
      return result
    }, {})

  return options.fn({ data })
}

module.exports = categories
