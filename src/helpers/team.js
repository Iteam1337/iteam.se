var front = require('yaml-front-matter');
var image = require('./gravatar');

module.exports.team = function (team, size) {
  var names = team.map(function (coworker) {
    var frontmatter = front.loadFront('./src/pages/medarbetare/' + coworker + '/index.hbs');

    var imgSize = size || false;
    var img = image.gravatar(frontmatter.email, imgSize);

    return '<li>'+
              '<img src="' + img + '">'+
              frontmatter.name +
              '<div class="job">' + frontmatter.job + '</div>'+
            '</li>';
  });

  return names.join().replace(/\,/g,'');
};