'use strict';

var front = require('yaml-front-matter');
var image = require('./gravatar');
var read  = require('./read');

module.exports.remoteHelp = function (options) {
  var dir = './src/pages/remotehelp/';
  var dirs = read.directory(dir);

  // function getPage(path, folder) {
  //   var frontmatter = front.loadFront(path);
  //   var firstName;
  //   var lastName;

  //   var title = frontmatter.subtitle || frontmatter.name;
  //   var logo = frontmatter.logo ?
  //     frontmatter.logo :
  //     '';

  //   var element = {
  //     frontmatter: frontmatter,
  //     url: lead + folder,
  //     title: title,
  //     logo: logo
  //   };

  //   if (type === 'coworker') {
  //     var imgSize = size || false;
  //     element.logo = image.gravatar(frontmatter.email, imgSize);
  //     firstName = title.substr(0, title.indexOf(' '));
  //     lastName = title.substr(title.lastIndexOf(' ') + 1);

  //     element.name = {
  //       first: firstName,
  //       last: lastName
  //     };
  //   }

  //   if (frontmatter.categories) {
  //     frontmatter.categoriesHTMLFriendly = frontmatter.categories
  //       .map(function (category) {
  //         return category
  //           .replace(/[^\w\d]/g, '')
  //           .replace(/^(\d){1,}/, '');
  //       })
  //       .join(' ');

  //     frontmatter.categories = frontmatter.categories.join(' ');
  //   }

  //   return {
  //     element: element,
  //     order: frontmatter.order || lastName
  //   };
  // }

  var orderedPages = dirs
    .map(function (page) {
      console.log(page);
      return page.element;
    });

  return options.fn({ data: orderedPages });
};
