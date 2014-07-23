'use strict';

var front = require('yaml-front-matter');
var read  = require('./read');

module.exports.categories = function (data, options) {
  var dir = './src/pages/case/';
  var dirs = read.directory(dir);
  var categories = [];

  var cases = dirs.map(function (folder) {
    var frontmatter = front.loadFront(dir + folder + '/index.hbs');

    if (!frontmatter.categories) { return; }

    frontmatter.categories.map(function (category) {
      categories.push(category);
    });

    return categories;
  }).filter(function (elm, pos, self) {
    return self.indexOf(elm) === pos && elm !== undefined;
  }).reduce(function (a, b) {
    return a.concat(b);
  }).sort();
  
  return options.fn({ data: cases });
};