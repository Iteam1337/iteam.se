'use strict';

var marked = require('marked');
var fs     = require('fs');
var path   = require('path');

module.exports.md = function (filePath, options) {
  if (filePath.indexOf('/') === -1) {
    return marked(filePath);
  }
  
  var dirName = path.dirname(options.data.orig.files[0].src);

  if(null === filePath.match(/\//g)) {
    filePath = path.resolve(dirName, filePath);
  }

  if(filePath.substr(-3) !== '.md') {
    filePath += '.md';
  }

  var text;

  try {
    text = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return 'Markdown text does not exist';
  }

  return marked(text);
};
