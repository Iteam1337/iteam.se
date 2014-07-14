var front = require('yaml-front-matter');
var crypto = require('crypto');

module.exports.team = function (team, size) {
  function getGravatarUrl (email, size) {
    var hash, url;

    hash = crypto.createHash('md5').update(email).digest('hex');
    url = "http://www.gravatar.com/avatar/" + hash + ".jpg";

    if (size) {
      url += "?s=" + size;
    }

    return url;
  }

  var names = team.map(function (coworker) {
    var frontmatter = front.loadFront('./src/pages/medarbetare/' + coworker + '/index.hbs');

    var imgSize = size || false;
    var img = getGravatarUrl(frontmatter.email, imgSize);

    return '<li>'+
              '<img src="' + img + '">'+
              frontmatter.name +
            '</li>';
  });

  return names.join().replace(/\,/g,'');
};