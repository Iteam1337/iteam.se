'use strict';

var front = require('yaml-front-matter');
var Handlebars = require('handlebars');

module.exports = function hb(path, options) {
  if (path.match(/^\//) !== null) {
    path = '.' + path;
  }
  if (path.match(/\.hbs$/i) === null) {
    path += '.hbs';
  }

  var content = front.loadFront(path).__content;

  if (!content) {
    return 'File does not exist';
  }

  return Handlebars.compile(content)();
};
