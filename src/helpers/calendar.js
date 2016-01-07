'use strict';
var front = require('yaml-front-matter');
var moment = require('moment');

module.exports = function calendar(options) {
  var frontmatter = front.loadFront('./src/pages/calendar.yml');
  var fmCalendar = frontmatter.calendar;

  if (!fmCalendar) {
    return '';
  }

  var filtered = fmCalendar.filter(function (entry) {
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
