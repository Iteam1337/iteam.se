'use strict'

const front = require('yaml-front-matter')
const gravatar = require('./gravatar')
const directory = require('./directory')

/*jshint maxcomplexity:14 */
function pages(options) {
  const data = options.hash || {}
  const dir = data.route || './src/pages/case/'

  const dirs = directory(dir)
    .reduce((directories, subDir) => {
      directories = directories
        .concat([subDir], directory(`${dir}${subDir}/`)
          .map(child => `${subDir}/${child}`))
      return directories
    }, [])

  const start = data.start || ''
  const type = data.type
  const size = data.size

  function getPage(path, folder) {
    const frontmatter = front.loadFront(path)
    let first
    let last

    const title = frontmatter.subtitle || frontmatter.name || ''
    const menutitle = frontmatter['menu-title'] || ''
    const logo = frontmatter.logo ? frontmatter.logo : ''

    const subCategories = frontmatter['menu-sub-category'] || null
    // const menuSubTitle = frontmatter['menu-sub-title'] || null

    let subpages = null

    if (subCategories) {
      const subDir = `${dir}${subCategories}/`

      subpages = directory(subDir)
        .reduce((directories, thisDirectory) => {
          const subPath = `${subDir}${thisDirectory}`
          const fm = front.loadFront(`${subPath}/index.hbs`)
          if (!fm) {
            return
          }
          directories.push({
            title: fm['menu-sub-title'] || null,
            path: `/${subCategories}/${thisDirectory}`,
            icon: fm['menu-sub-icon'] || null
          })
          return directories
        }, [])
    }

    const element = {
      frontmatter,
      url: `${start}${folder}`,
      menutitle,
      subpages,
      title,
      logo
    }


    if (type === 'coworker') {
      element.logo = gravatar(frontmatter.email, (size || false))
      const parts = title.split(' ')

      if (parts.length <= 1) {
        first = parts[0]
        last = null
      } else {
        first = title.substr(0, title.indexOf(' '))
        last = title.substr(first.length + 1, title.length)
      }

      element.name = {
        first,
        last
      }
    }

    if (frontmatter.categories) {
      frontmatter.categoriesHTMLFriendly = frontmatter
        .categories
        .map(category =>
          category
            .replace(/[^\w\d]/g, '')
            .replace(/^(\d){1,}/, ''))
        .join(' ')

      frontmatter.categories = frontmatter.categories.join(' ')
    }

    return {
      element,
      order: frontmatter['menu-order'] !== undefined ?
        frontmatter['menu-order'] :
        (frontmatter.order !== undefined ?
         frontmatter.order :
         last)
    }
  }

  const orderedPages = dirs
    .reduce((result, folder) => {
      const page = getPage(`${dir}${folder}index.hbs`, folder)
      const categories = page.element.frontmatter.categories

      if (!data.category) {
        result.push(page)
      } else if (categories && categories.indexOf(data.category) >= 0) {
        result.push(page)
      }

      return result
    }, [])
    .filter(page => {
      const fm = page.element.frontmatter

      if (fm.unpublished) {
        return false
      }
      return fm.hasOwnProperty('menu-order') ||
        (type === 'coworker' &&
         fm.layout &&
         fm.layout.match(/coworker/i) !== null)
    })
    .sort((a, b) => {
      // position 'You' last
      if (type === 'coworker') {
        if (a.order === undefined) {
          return 1
        } else if (b.order === undefined) {
          return -1
        }
      }
      if (typeof a.order === 'number') {
        return a.order > b.order
      } else if (typeof a.order === 'string') {
        return a.order.localeCompare(b.order)
      } else {
        return false
      }
    })
    .map(page => page.element)

  return options.fn({
    data: orderedPages
  })
}

module.exports = pages
