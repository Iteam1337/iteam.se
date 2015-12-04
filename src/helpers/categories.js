'use strict';

var front = require('yaml-front-matter');
var read  = require('./read');

module.exports.categories = function (data, options) {
  var dir = './src/pages/case/';
  var dirs = read.directory(dir);
  var categories = [];
  dirs.forEach(function (folder) {
    var frontmatter = front.loadFront(dir + folder + '/index.hbs');

    if (!frontmatter.categories) { return; }
    
    frontmatter.categories.map(function (category) {
      if(category) {
        categories.push(category);
      }
    });
    return categories;
  });

  var cases = categories.reduce(function (result, element) {
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

  return options.fn({ data: cases });
};