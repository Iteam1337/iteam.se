(function () {
  'use strict'

  function SocialHub(type, count, resolution) {
    window.Social.apply(this, [type, count]);
    this.url = '//insta-team.iteamdev.se/';
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

  SocialHub.prototype = Object.create(window.Social.prototype);

  SocialHub.prototype.parseLinks = function (text) {
    var regex = /((http(s)?:\/\/)|\b|^)[a-zA-Z0-9\-_\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?([a-zA-Z0-9åäö\!\&\-\.\_\?\,\'\/\\\+\;\%\$\#\=\~\:\(\)\@])*/gi;
    return text.replace(regex, function (str) {
      return '<a target="_blank" href="' + ((!arguments[2]) ? '//' + str : str) + '">' + str + '</a>';
    });
  }

  SocialHub.prototype.URL = function () {
    return this.url + this.handle + '?count=' + this.count;
  }

  SocialHub.prototype.prerender = function (array) {
    var _this = this;

    function getType(str) {
      var i = str.lastIndexOf('.');
      return 'video/' + str.substr(i + 1);
    }
    var newElement = document.createElement('div');
    array.forEach(function (data, i) {
      var node = null;
      var source = null;
      var video = null;
      var image = null;
      if (data.type === 'twitter') {
        node = document.createElement('div');
        node.innerHTML = _this.parseLinks(data.text);
      } else if (data.type === 'image') {
        node = document.createElement('img');
        image = data.image[_this.resolution];
        node.setAttribute('src', image.url);
        node.setAttribute('width', image.width);
        node.setAttribute('height', image.height);
        node.setAttribute('href', data.link);
        node.setAttribute('target', '_blank');
      } else if (data.type === 'video') {
        node = document.createElement('video');
        source = document.createElement('source');
        video = data.video[_this.resolution];
        node.setAttribute('poster', data.image[_this.resolution].url);
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
    });
    return newElement;
  }

  SocialHub.prototype.handleResponse = function (response) {
    if ('function' === typeof response) {
      return [[], 0];
    }
    try {
      response = JSON.parse(response);
      if (response.error !== null) {
        console.error(response.error);
      }
      if (response.data && response.data.length && response.data[0].created_at) {
        return [response.data, response.data[0].created_at];
      }
    } catch (error) {
      console.error(error);
    }
    return [[], 0];

  }

  SocialHub.prototype.constructor = window.Social;
  window.SocialHub = SocialHub;
})();
