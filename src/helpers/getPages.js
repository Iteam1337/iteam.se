'use strict'

const front = require('yaml-front-matter')
const gravatar = require('./gravatar')
const directory = require('./directory')

function getPage(path, opts) {
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
    const subDir = `${opts.dir}${subCategories}/`

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
    url: `${opts.start}${opts.folder}`,
    menutitle,
    subpages,
    title,
    logo
  }

  if (opts.type === 'coworker') {
    element.logo = gravatar(frontmatter.email, (opts.size || false))
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

/*jshint maxcomplexity:16 */
function getPages(options, engine) {
  const data = options.hash || options
  const dir = data.route || './src/pages/case/'
  const start = data.start || ''
  const type = data.type
  const size = data.size

  const orderedPages = directory(dir)
    .reduce((directories, subDir) => {
      if (data.includeSubdirectories) {
        directories = directories
          .concat([subDir], directory(`${dir}${subDir}/`)
            .map(child => `${subDir}/${child}`))
      } else {
        directories = directories.concat([subDir])
      }
      return directories
    }, [])
    .reduce((result, folder) => {
      const page = getPage(`${dir}${folder}/index.hbs`, {
        folder,
        type,
        start,
        dir,
        size
      })

      const categories = page.element.categories

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

  const result = {
    data: orderedPages
  }

  if (options.fn) {
    return options.fn(result)
  }

  if (engine && engine.fn) {
    return engine.fn(result)
  }

  return result
}

module.exports = getPages
