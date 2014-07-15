var crypto = require('crypto');

module.exports.gravatar = function (email, size) {
  var hash, url;

  hash = crypto.createHash('md5').update(email).digest('hex');
  url = "http://www.gravatar.com/avatar/" + hash + ".jpg";

  if (size) {
    url += "?s=" + size;
  }

  return url;
};