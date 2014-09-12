'use strict';
var front = require('yaml-front-matter');
var image = require('./gravatar');
var read  = require('./read');

module.exports.pages = function (options) {
  var orderedPages;
  var data = options.hash || {}; 
  var dir = data.route || './src/pages/case/';
  var dirs = read.directory(dir);
  var lead = data.start || '';
  var type = data.type;
  var size = data.size;

  function getPage(path, folder) {
    var frontmatter = front.loadFront(path);
    var title;
    var logo;
    var firstName;
    var lastName;

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
  
    return {
      element: element,
      order: frontmatter.order || lastName
    };
  }

  orderedPages = dirs.reduce(function (result, folder) {
    var page = getPage(dir + folder + '/index.hbs', folder);

    result.push(page);

    return result;
  }, []).map(function (page) {
    return page.element;
  });

  return options.fn({ data: orderedPages });
};