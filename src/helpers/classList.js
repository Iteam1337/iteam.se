'use strict'

function classList(context) {
  if (typeof context !== 'object' || !Object.keys(context).length) {
    return
  }

  let classes = ''

  if (context.hasOwnProperty('extra-classes')) {
    classes += ` ${context['extra-classes']} `
  }
  if (context.hasOwnProperty('color')) {
    classes += ` color-${context.color} `
  }
  if (context.hasOwnProperty('background-color')) {
    classes += ` background-${context['background-color']} `
  }
  if (context.hasOwnProperty('animate')) {
    classes += ` wow fadeIn `
  }
  if (context.hasOwnProperty('parallax')) {
    classes += ` parallax `
  }

  return classes
}

module.exports = classList
