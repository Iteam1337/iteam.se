'use strict';

var front = require('yaml-front-matter');
var image = require('./gravatar');
var directory  = require('./directory');

/*jshint maxcomplexity:100 */
function pages(options) {
  var orderedPages;
  var data = options.hash || {};
  var dir = data.route || './src/pages/case/';
  var dirs = directory(dir)
    .reduce(function (directories, subDir) {
      directories = directories
        .concat([subDir], directory(dir + subDir + '/')
          .map(function (child) {
            return subDir + '/' + child
          }));
      return directories;
    }, []);
  var lead = data.start || '';
  var type = data.type;
  var size = data.size;

  function getPage(path, folder) {
    var frontmatter = front.loadFront(path);
    var firstName;
    var lastName;

    var title = frontmatter.subtitle || frontmatter.name;
    var menuTitle = frontmatter['menu-title'] || '';
    var logo = frontmatter.logo ?
      frontmatter.logo :
      '';
    var subCategories = frontmatter['menu-sub-category'] || null;
    var menuSubTitle = frontmatter['menu-sub-title'] || null;

    var subPages = null;

    if (subCategories) {
      var subDir = dir + subCategories + '/';
      subPages = directory(subDir)
        .reduce(function (directories, thisDirectory) {
          var subPath = subDir + thisDirectory;
          var fm = front.loadFront(subPath + '/index.hbs');
          if (!fm) {
            return;
          }
          directories.push({
            title: fm['menu-sub-title'] || null,
            path: '/' + subCategories + '/' + thisDirectory,
            icon: fm['menu-sub-icon'] || null
          });
          return directories;
        }, []);
    }


    var element = {
      frontmatter: frontmatter,
      url: lead + folder,
      menutitle: menuTitle,
      subpages: subPages,
      title: title,
      logo: logo
    };

    if (type === 'coworker') {
      var imgSize = size || false;
      element.logo = image.gravatar(frontmatter.email, imgSize);
      var parts = title.split(' ');
      if (parts.length <= 1) {
        firstName = parts[0];
      } else {
        firstName = title.substr(0, title.indexOf(' '));
        lastName = title.substr(firstName.length + 1, title.length);
      }
      // lastName = title.substr(title.lastIndexOf(' ') + 1);

      element.name = {
        first: firstName,
        last: lastName
      };
    }

    if (frontmatter.categories) {
      frontmatter.categoriesHTMLFriendly = frontmatter.categories
        .map(function (category) {
          return category
            .replace(/[^\w\d]/g, '')
            .replace(/^(\d){1,}/, '');
        })
        .join(' ');

      frontmatter.categories = frontmatter.categories.join(' ');
    }

    return {
      element: element,
      order: frontmatter['menu-order'] !== undefined ?
        frontmatter['menu-order'] :
        (frontmatter.order !== undefined ?
         frontmatter.order :
         lastName)
    };
  }

  orderedPages = dirs
    .reduce(function (result, folder) {
      var page = getPage(dir + folder + '/index.hbs', folder);
      var categories = page.element.frontmatter.categories;

      if (!data.category) {
        result.push(page);
      } else if (categories && categories.indexOf(data.category) >= 0) {
        result.push(page);
      }

      return result;
    }, [])
    .filter(function (page) {
      var fm = page.element.frontmatter;
      if (fm.unpublished) {
        return false;
      }
      return fm.hasOwnProperty('menu-order') ||
        (type === 'coworker' &&
         fm.layout &&
         fm.layout.match(/coworker/i) !== null);
    })
    .sort(function (a, b) {

      // position 'You' last
      if (type === 'coworker') {
        if (a.order === undefined) {
          return 1;
        } else if (b.order === undefined) {
          return -1;
        }
      }
      if (typeof a.order === 'number') {
        return a.order > b.order;
      } else if (typeof a.order === 'string') {
        return a.order.localeCompare(b.order);
      } else {
        return false;
      }
    })
    .map(function (page) {
      return page.element;
    });

  return options.fn({
    data: orderedPages
  });
}

module.exports = pages
module.exports.pages = pages
