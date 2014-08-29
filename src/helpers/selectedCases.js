'use strict';

var front = require('yaml-front-matter');
var pages = require('./pages');

module.exports.selectedCases = function (options) {
  var data = options.hash || {};
  var cases = data.cases || [];
  var selectedCases = [];

  cases.forEach(function (caseName) {
  	var frontmatter = front.loadFront('./src/pages/case/' + caseName + '/index.hbs');

  	frontmatter.url = caseName.toLowerCase();

  	selectedCases.push(frontmatter);
  });

  return options.fn({ data: selectedCases });
};