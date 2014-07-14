var fs = require('fs');
var front = require('yaml-front-matter');

module.exports.pages = function (route, start, options) {
  var dir = route || './src/pages/case/';
  var lead = start || '';

  var dirs = fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(dir + file).isDirectory();
  });

  var pages = dirs.map(function (folder) {
    var frontmatter = front.loadFront(dir + folder + '/index.hbs');
    var title = frontmatter.subtitle || frontmatter.name;

    var listUrl = '<li>'+
                    '<a href="' + lead + folder + '/">' + title + '</a>'+
                  '</li>';

    return {
      element: listUrl,
      order: frontmatter.order || undefined
    };
  }).sort(function (a,b) {
    return a.order - b.order;
  }).map(function (page) {
    return page.element;
  });

  return pages.join().replace(/\,/g,'');
};