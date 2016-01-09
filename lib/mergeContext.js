'use strict'

/*
  Merge context.

  This merges the YAML at the top of the page with the
  defaults for the layout it uses, and then the defaults
  for that layouts layout (if any) and so on.
 */
function mergeContext(file) {
  if (!file.data) {
    file.data = {}
  }

  /* jshint validthis:true */
  const options = this.options

  if (!options ||
      !options.defaults ||
      !options.defaults.layout) {
    return file.data
  }

  if (!file.data.layout) {
    return file.data
  }

  const fileLayout = file.data.layout
  const defaultsLayout = options.defaults.layout
  let defaults = defaultsLayout[fileLayout]

  if (!defaults) {
    return file.data
  }

  /* jshint validthis:true */
  const layouts = this.views.layouts

  let merged = Object.assign({}, defaults, file.data)
  let view = layouts[fileLayout]
  while (view !== undefined) {
    defaults = defaultsLayout[view.layout]
    if (defaults !== undefined) {
      merged = Object.assign(merged, defaults, file.data)
    }
    view = layouts[view.layout]
  }

  file.data = merged

  return merged
}

module.exports = mergeContext
