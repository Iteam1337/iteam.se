var front = require('yaml-front-matter');
var image = require('./gravatar');
var read  = require('./read');

module.exports.pages = function (route, start, type, size, options) {
  var pages;
  var dir = route || './src/pages/case/';
  var lead = start || '';
  var dirs = read.directory(dir);

  pages = dirs.map(function (folder) {
    var frontmatter;
    var title;
    var listUrl;
    var logo;
    var url;
    var lastName;

    frontmatter = front.loadFront(dir + folder + '/index.hbs');
    title       = frontmatter.subtitle || frontmatter.name;
    url         = '<a href="' + lead + folder + '/">' + title + '</a>';
    logo        = frontmatter.logo ? '<img src="' + frontmatter.logo + '">' : '';

    if (type === 'coworker') {
      var imgSize = size || false;
      var img = image.gravatar(frontmatter.email, imgSize);
      lastName = title.substr(title.lastIndexOf(' ') + 1);

      listUrl = '<li>'+
                  '<a href="' + lead + folder + '">'+
                    '<img src="' + img + '">'+
                  '</a>'+
                  '<div>'+
                    url +
                    '<p>'+ frontmatter.job + '</p>'+
                  '</div>'+
                '</li>';
    } else if (type === 'services') {
      listUrl = '<li>'+
            '<i class="' + frontmatter.icon + '"></i>'+
            '<div>'+
              url+
              '<p>'+ frontmatter.description + '</p>'+
            '</div>'+
          '</li>';
    } else {
      listUrl = '<li>'+ logo + url + '</li>';
    }

    return {
      element: listUrl,
      order: frontmatter.order || lastName
    };
  }).sort(function (a,b) {
    if (typeof a.order === 'number') {
      return a.order - b.order;
    } else if (typeof a.order === 'string') {
      return a.order.localeCompare(b.order);
    } else {
      return false;
    }
  }).map(function (page) {
    return page.element;
  });

  return pages.join().replace(/\,/g,'');
};