'use strict';

/*jshint maxcomplexity:12 */
module.exports.color = function (color) {
  color = typeof color === 'string' ? color : ''
  switch (color.toLowerCase()) {
  case 'green':
  case 'spring-green':
    return '#38ffa1';
  case 'pink':
  case 'red':
  case 'radical-red':
    return '#ff3b5c';
  case 'orange':
  case 'flush-orange':
    return '#ff8600';
  case 'blue':
    return '#668cff';
  case 'white':
    return '#fff';
  case 'black':
    return '#000';
  default:
    return '#38ffa1';
  }
};
