'use strict';

var front = require('yaml-front-matter');
var directory = require('./directory');

module.exports = function categories(data, options) {
  var dir = './src/pages/case/';
  var dirs = directory(dir);
  var fmCategories = [];
  dirs.forEach(function (folder) {
    var frontmatter = front.loadFront(dir + folder + '/index.hbs');

    if (!frontmatter.categories) { return; }

    frontmatter.categories.map(function (category) {
      if (category) {
        fmCategories.push(category);
      }
    });

    return fmCategories;
  });

  var cases = fmCategories.reduce(function (result, element) {
    if(result[element]) {
      result[element].hits++;
    } else {
      result[element] = {
        hits: 1
      };
    }

    result[element].visible = result[element].hits > 1;
    return result;
  }, {});

  return options.fn({
    data: cases
  });
};
