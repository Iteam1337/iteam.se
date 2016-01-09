'use strict'

const marked = require('marked')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

function markdown(options) {
  /*jshint validthis:true */
  if (options.fn) {
    return marked(options.fn(this))
  }
  return marked(options, this)

}

module.exports = markdown
