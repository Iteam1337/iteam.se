'use strict';
var front = require('yaml-front-matter');
var moment = require('moment');

module.exports.calendar = function (options) {
  var frontmatter = front.loadFront('./src/pages/calendar.hbs');
  var calendar = frontmatter.calendar;

  if (!calendar) {
    return '';
  }

  var filtered = calendar.filter(function (entry) {
    return moment(entry.time).isAfter(moment().subtract(30, 'day'));
  }).sort(function (a, b) {
    return moment(a.time).diff(moment(b.time));
  });

  if (filtered.length === 0) {
    filtered.push({
      title: 'Currently no upcoming events'
    });
  }

  return options.fn(filtered);
};
