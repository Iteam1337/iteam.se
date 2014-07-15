var fs = require('fs');
var front = require('yaml-front-matter');
var image = require('./gravatar');

module.exports.pages = function (route, start, type, size, options) {
  var dir, dirs, lead, pages;

  dir = route || './src/pages/case/';
  lead = start || '';

  dirs = fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(dir + file).isDirectory();
  });

  pages = dirs.map(function (folder) {
    var frontmatter, title, listUrl;

    frontmatter = front.loadFront(dir + folder + '/index.hbs');
    title = frontmatter.subtitle || frontmatter.name;

    if (type === 'coworker') {
      var imgSize = size || false;
      var img = image.gravatar(frontmatter.email, imgSize);

      listUrl = '<li>'+
                  '<img src="' + img + '">'+
                  '<div>'+
                    '<a href="' + lead + folder + '/">' + title + '</a>'+
                    '<p>'+ frontmatter.job + '</p>'+
                  '</div>'+
                '</li>';
    } else {
      listUrl = '<li>'+
                  '<a href="' + lead + folder + '/">' + title + '</a>'+
                '</li>';
    }

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