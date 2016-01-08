'use strict'

function mergeContext(file) {
  if (!file.data) {
    file.data = {}
  }

  if (!this.options || !this.options.defaults) {
    return file.data
  }

  const merged = Object.assign({}, this.options.defaults, file.data)
  file.data = merged

  return merged
}

module.exports = mergeContext
