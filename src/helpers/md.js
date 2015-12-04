'use strict';

var marked = require('marked');
var fs = require('fs');
var path = require('path');

module.exports.md = function (filePath, options) {
  var dirName;
  try {
    dirName = path.dirname(options.data.orig.files[0].src);
  } catch (error) {
    dirName = process.cwd();
  }

  if (filePath.indexOf('/') === -1) {
    filePath = path.join(dirName, filePath);
  }

  if (filePath.substr(-3) !== '.md') {
    filePath += '.md';
  }

  var text;

  try {
    text = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return 'Markdown text does not exist at path: ' + filePath;
  }

  return marked(text);
};
