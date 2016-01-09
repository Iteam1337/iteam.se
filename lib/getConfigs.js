'use strict'

const path = require('path')
const glob = require('glob')
const lodash = require('lodash')
const front = require('yaml-front-matter')

function renameKey(filePath, pathReplace) {
  return filePath
    .replace(path.extname(filePath), '')
    .replace(pathReplace, '')
    .replace(/\//g, '.')
}

function getConfigs(path) {
  if (typeof path !== 'string') {
    return Promise.reject('path not string')
  }

  const pathReplace = path.replace(/\*.+?$/, '')

  return new Promise((resolve, reject) => {
    glob(path, null, (error, files) => {
      if (error) {
        return reject(error)
      }

      resolve(files
        .map(file => {
          const data = front.loadFront(file)
          if (data.hasOwnProperty('__content')) {
            delete data.__content
          }
          const key = renameKey(file, pathReplace)

          let object = {}
          lodash.set(object, key, data)
          return object
        })
        .reduce((object, current) => lodash.merge(object, current), {}))
    })
  })

}

module.exports = getConfigs
