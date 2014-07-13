var fs = require('fs');
var front = require('yaml-front-matter');

module.exports.pages = function (route, start, options) {
  var dir = route || './src/pages/case/';
  var lead = start || '';

  var dirs = fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(dir + file).isDirectory();
  });

  var cases = dirs.map(function (folder) {
    var frontmatter = front.loadFront(dir + folder + '/index.hbs');
    var listUrl = '<li>'+
                    '<a href="' + lead + folder + '/">' + frontmatter.subtitle + '</a>'+
                  '</li>';

    return listUrl;
  });

  return cases.join().replace(/\,/g,'');
};