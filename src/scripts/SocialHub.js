'use strict';

function SocialHub(type, count, resolution) {
  Social.apply(this, [type, count]);

  this.url = 'http://insta-team.se/';
  if (this.type === 'twitter') {
    this.url += 'twitter/';
  }
  this.url += 'user/';

  this.resolution = (resolution || '').toLowerCase();
  if (this.resolution !== 'low' && this.resolution !== 'standard') {
    this.resolution = 'standard';
  }
  this.resolution += '_resolution';
}

SocialHub.prototype = Object.create(Social.prototype);
SocialHub.prototype.constructor = Social;

SocialHub.prototype.parseLinks = function (text) {
  var regex = /((http(s)?:\/\/)|\b|^)[a-zA-Z0-9\-_\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?([a-zA-Z0-9åäö\!\&\-\.\_\?\,\'\/\\\+\;\%\$\#\=\~\:\(\)\@])*/gi;
  return text.replace(regex, function (str) {
    return '<a target="_blank" href="' + ( ( !arguments[ 2 ] ) ? 'http://' + str : str ) + '">' + str + '</a>';
  });
};

SocialHub.prototype.URL = function () {
  return this.url + this.handle + '?count=' + this.count;
};

SocialHub.prototype.prerender = function (array) {
  function getType (str) {
    var i = str.lastIndexOf('.');
    return 'video/' + str.substr(i + 1);
  }
  var newElement = document.createElement('div');
  var type = '';
  var node = null, source = null, video = null, image = null;
  for (var i = 0, max = array.length, data; i < max; i++) {
    data = array[i];
    if (this.type === 'twitter') {
      node = document.createElement('div');
      node.innerHTML = this.parseLinks(data.text);
    } else if (data.type === 'image') {
      node = document.createElement('img');
      image = data.image[this.resolution];
      node.setAttribute('src', image.url);
      node.setAttribute('width', image.width);
      node.setAttribute('height', image.height);
      node.setAttribute('href', data.link);
      node.setAttribute('target', '_blank');
    } else if (data.type === 'video') {
      node = document.createElement('video');
      source = document.createElement('source');
      video = data.video[this.resolution];
      node.setAttribute('poster', data.image[this.resolution].url);
      node.setAttribute('width', video.width);
      node.setAttribute('height', video.height);
      node.setAttribute('controls', 'controls');
      source.setAttribute('src', video.url);
      source.setAttribute('type', getType(video.url));
      node.appendChild(source);
    } else {
      node = document.createElement('span');
    }
    newElement.appendChild(node);
  }
  return newElement;
};

SocialHub.prototype.handleResponse = function (response) {
  response = JSON.parse(response);
  if (response.error !== null) {
    console.error(response.error);
  }
  return [response.data, response.data[0].created_at];
};
