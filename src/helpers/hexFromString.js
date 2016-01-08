'use strict'

/*jshint maxcomplexity:14 */
function hexFromString(color) {
  color = typeof color === 'string' ? color : ''

  const matchIfColor = /(?:^(?:(?:rgb(?:a)?\(|hsl(?:a)?\().+?$)|(?:\#+(?:(?:[a-f\d]){3,3}|(?:[a-f\d]){6,6}))(?:\;){0,1}$)/i
  if (color.match(matchIfColor) !== null) {
    return color
  }

  switch (color.toLowerCase()) {
  case 'green':
  case 'spring-green':
    return '#38ffa1'
  case 'pink':
  case 'red':
  case 'radical-red':
    return '#ff3b5c'
  case 'orange':
  case 'flush-orange':
    return '#ff8600'
  case 'blue':
    return '#668cff'
  case 'white':
    return '#fff'
  case 'black':
    return '#000'
  default:
    return '#38ffa1'
  }
}

module.exports = hexFromString
