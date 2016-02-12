'use strict'

const hexFromString = require('./hexFromString')

function toURL(string) {
  if (!string) {
    return ''
  }
  if (string.match(/^url\(/i) !== null) {
    return string
  }
  return `url('${string}')`
}

function styleHelper(context) {
  if (typeof context !== 'object' || !Object.keys(context).length) {
    return
  }

  let style = ''
  let hasBackground = false

  if (context.hasOwnProperty('height')) {
    style += `height: ${context.height};`
  }
  if (context.hasOwnProperty('min-height')) {
    style += `min-height: ${context['min-height']};`
  }
  if (context.hasOwnProperty('background-size')) {
    style += `background-size: ${context['background-size']};`
  }
  if (context.hasOwnProperty('padding-top')) {
    style += `padding-top: ${context['padding-top']};`
  }
  // if (context.hasOwnProperty('background-color')) {
  //   style += `background-color: ${hexFromString(context['background-color'])};`
  // }
  if (context.hasOwnProperty('background-image')) {
    hasBackground = true
    style += `background-image: ${toURL(context['background-image'])};`
  }
  if (context.hasOwnProperty('background-image-url')) {
    hasBackground = true
    style += `background-image: ${toURL(context['background-image-url'])};`
  }
  if (context.hasOwnProperty('background-position')) {
    style += `background-position: ${context['background-position']};`
  } else if (hasBackground) {
    style += `background-position: center center;`
  }

  return style
}

module.exports = styleHelper
