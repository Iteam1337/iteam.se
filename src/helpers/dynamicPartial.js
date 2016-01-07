'use strict';

var Handlebars = require('handlebars');
var fs = require('fs');
var files = require('./files');
var path = require('path');

module.exports = function dynamicPartial(options) {
  var data = options.hash.partial || {};

  if (!data.type) {
    return 'No type defined';
  }

  var partials = {};
  var dirPath = './src/partials/';

  files(dirPath).forEach(function (file) {
    var partial = fs.readFileSync(dirPath + file, 'utf8');
    partials[path.basename(file, '.hbs')] = partial;
  });

  var html = partials[data.type];

  if (typeof html === 'function') {
    console.log(data);
    console.log(html());
    return 'Partial defined as function';
  }

  if(!html) {
    return 'No partial exists';
  }

  var template = Handlebars.compile(html);

  return template(data, options);
};
