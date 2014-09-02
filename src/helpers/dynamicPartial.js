'use strict';

var Handlebars = require('handlebars');

module.exports.dynamicPartial = function (options) {
  var data = options.hash.partial || {};
  var html = Handlebars.partials[data.type];

  if(!html) {
    return 'No partial exists';
  }

  var template = Handlebars.compile(html);
  return template(data, options);
};