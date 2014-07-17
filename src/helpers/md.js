var marked = require('marked');
var fs = require('fs');

module.exports.md = function (path) {
  var text = fs.readFileSync(path, 'utf8');
  return marked(text);
};