'use strict';
var front = require('yaml-front-matter');
var moment = require('moment');

module.exports.calendar = function (data, options) {
  var frontmatter = front.loadFront('./src/pages/index.hbs');
  var calendar = frontmatter.partials.filter(function (partial) { 
    return partial.type === 'calendar'; 
  })[0];

  if(!calendar) {
    return '';
  }

  var filtered = calendar.content.filter(function (entry) {
    return moment(entry.time).isAfter(moment().subtract(30, 'day'));
  }).sort(function (a, b) {
    return moment(a.time).diff(moment(b.time));
  });

  return options.fn(filtered);
};