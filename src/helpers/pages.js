'use strict';
var front = require('yaml-front-matter');
var image = require('./gravatar');
var read  = require('./read');

module.exports.pages = function (data, options) {
  var pages;
  data = JSON.parse(data);
  var dir = data.route || './src/pages/case/';
  var dirs = read.directory(dir);
  var lead = data.start || '';
  var type = data.type;
  var size = data.size;

  pages = dirs.map(function (folder) {
    var frontmatter;
    var title;
    var logo;
    var firstName;
    var lastName;

    frontmatter = front.loadFront(dir + folder + '/index.hbs');
    title = frontmatter.subtitle || frontmatter.name;
    logo = frontmatter.logo ? 
      frontmatter.logo : 
      '';

    var element = {
      frontmatter: frontmatter,
      url: lead + folder,
      title: title,
      logo: logo
    };

    if (type === 'coworker') {
      var imgSize = size || false;

      element.logo = image.gravatar(frontmatter.email, imgSize);
      firstName = title.substr(0, title.indexOf(' '));
      lastName = title.substr(title.lastIndexOf(' ') + 1);

      element.name = {
        first: firstName,
        last: lastName
      };
    }
    if(frontmatter.categories) {
      frontmatter.categories = frontmatter.categories.join(' ');
    }
    return {
      element: element,
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
  return options.fn({ data: pages });
};