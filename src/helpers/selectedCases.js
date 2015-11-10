'use strict';

var front = require('yaml-front-matter');
var pages = require('./pages');
var slug = require('./slugify');

module.exports.selectedCases = function (options) {
  var data = options.hash || {};
  var cases = data.cases || [];
  var selectedCases = [];

  cases.forEach(function (caseName) {
  	var frontmatter = front.loadFront('./src/pages/case/' + caseName + '/index.hbs');

  	frontmatter.url = caseName.toLowerCase();
    frontmatter.classes = "";

    if (frontmatter.categories ) {
      frontmatter.categories.forEach(function (category) {
        frontmatter.classes += ' ' + slug.slugify(category);
      });
    }

  	selectedCases.push(frontmatter);
  });

  return options.fn({ data: selectedCases });
};
