var marked = require('marked');
var fs = require('fs');

module.exports.md = function (path) {
  if (path.substr(-3) !== '.md') {
    path = path + '.md';
  }

  var text = fs.readFileSync(path, 'utf8');
  return marked(text);
};