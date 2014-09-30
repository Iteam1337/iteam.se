var front = require('yaml-front-matter');
var image = require('./gravatar');

module.exports.team = function (data, options) {
  var team = data.team;
  var size = data['gravatar-sizes'];
  var names = team.map(function (coworker) {
    var frontmatter = front.loadFront('./src/pages/medarbetare/' + coworker + '/index.hbs');

    var imgSize = size || false;
    return {
      frontmatter: frontmatter,
      img: image.gravatar(frontmatter.email, imgSize),
      url: '/medarbetare/' + coworker
    };
  });

  return options.fn({ data: names });
};