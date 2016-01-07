'use strict';

var crypto = require('crypto');

module.exports = function gravatar(email, size) {
  var hash;
  var url;

  if (!email) {
    return;
  }

  hash = crypto.createHash('md5').update(email).digest('hex');
  url = 'https://www.gravatar.com/avatar/' + hash + '.jpg';

  if (size) {
    url += '?s=' + size
  }

  return url;
}
