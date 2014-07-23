'use strict';

var Handlebars = require('handlebars');

module.exports.partial = function (data, options) {
  if(!data) {
    return 'No data provided';
  }

  var html = Handlebars.partials[data.type];
  if(!html) {
    return 'No partial exists';
  }
  var template = Handlebars.compile(html);
  return template(data, options);
};