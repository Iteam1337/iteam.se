'use strict';
var marked = require('marked');
var fs = require('fs');
var path = require('path');

module.exports.md = function (filePath, options) {
  var dirName = path.dirname(options.data.orig.files[0].src);

  if(null === filePath.match(/\//g)) {
    filePath = path.resolve(dirName, filePath);
  }

  if (filePath.substr(-3) !== '.md') {
    filePath += '.md';
  }

  var text;

  try {
    text = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return false;
  }

  return marked(text);
};

