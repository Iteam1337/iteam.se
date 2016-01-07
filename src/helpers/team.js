'use strict';

var front = require('yaml-front-matter');
var image = require('./gravatar');

module.exports = function team(data, options) {
  var size = data['gravatar-sizes'];
  var names = data.team.map(function (coworker) {
    var frontmatter = front.loadFront('./src/pages/team/' + coworker + '/index.hbs');
    var imgSize = size || false;

    var name = (frontmatter.name || ' ').split(' ');
    return {
      frontmatter: frontmatter,
      logo: image.gravatar(frontmatter.email, imgSize),
      url: '/team/' + coworker,
      size: size || 300,
      name: {
        first: name[0] || '',
        last: name[1] || ''
      }
    };
  });

  return options.fn({
    data: names
  });
};
