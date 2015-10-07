'use strict';

var front = require('yaml-front-matter');

module.exports.remoteAssistance = function (options) {

  var url = 'remoteassistance';
  var path = './src/pages/' + url + '/index.hbs';
  var data = front.loadFront(path);

  data.url = '/' + url;

  return options.fn(data);
};
