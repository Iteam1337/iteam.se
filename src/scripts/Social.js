'use strict';

/**
 * For displaying content from social networks
 * The ones that are tested at the moment is only
 * instagram or twitter.
 * To use a different source than insta-team, change
 * the Social.url after it's instanced and before it's
 * initialized.
 * When calling init, use the twitter- OR instagram-handle
 * as the first argument, then where it should be placed as
 * the second.
 * TODO: be able to accept MOAR sources
 *
 * @param *optional {string}        type       twitter or instagram
 * @param *optional {number|string} count      how many items that should be displayed
 * @param *optional {string}        resolution 'low' or 'standard' resolution
 */
function Social (type, count, resolution) {
  this.storageName = function () {
    return type + '.' + this.handle;
  };
  this.type = type.toLowerCase();
  this.count = count || 3;

  this.handle = '';
  this.container = null;


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

Social.prototype.parseLinks = function (text) {
  var regex = /((http(s)?:\/\/)|\b|^)[a-zA-Z0-9\-_\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?([a-zA-Z0-9åäö\!\&\-\.\_\?\,\'\/\\\+\;\%\$\#\=\~\:\(\)\@])*/gi;
  return text.replace(regex, function (str) {
    return '<a target="_blank" href="' + ( ( !arguments[ 2 ] ) ? 'http://' + str : str ) + '">' + str + '</a>';
  });
};

Social.prototype.URL = function () {
  return this.url + this.handle + '?count=' + this.count;
};

Social.prototype.getLocal = function () {
  var local = window.localStorage.getItem(this.storageName());
  if (local === null) {
    return null;
  }
  return JSON.parse(local);
};

Social.prototype.save = function (data, latest) {
  if (latest === undefined) {
    return;
  }

  var local = this.getLocal();
  var ignoreSave = (local !== null && (local.data && local.latest) && (data.length === local.data.length && local.latest <= latest));

  if (ignoreSave) {
    return;
  }

  window.localStorage.setItem(this.storageName(), JSON.stringify({
    'data': data,
    'latest': latest
  }));

  this.render(data);
};

Social.prototype.updateNode = function (newElement) {
  this.container.parentNode.replaceChild(newElement, this.container);
  this.container = newElement;
};

Social.prototype.draw = function (html) {
  this.updateNode(this.container, html);
};

Social.prototype.render = function (object) {
  function getType (str) {
    var i = str.lastIndexOf('.');
    return 'video/' + str.substr(i + 1);
  }
  if (!object ||
      !object.length) {
    return;
  }
  var newElement = document.createElement('div');
  var type = '';
  var node = null, source = null, video = null, image = null;
  for (var i = 0, max = object.length, data; i < max; i++) {
    data = object[i];
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
  this.updateNode(newElement);
};

Social.prototype.getContent = function () {
  var self = this;
  var xhr = new window.XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.statusText !== 'OK') {
      return;
    }
    var response = JSON.parse(xhr.responseText);
    if (response.error !== null) {
      console.error(response.error);
      return;
    }
    self.save(response.data, response.data[0].created_at);
  };
  xhr.onerror = function () {
    console.error(xhr.responseText);
  };
  xhr.open('GET', this.URL());
  xhr.send(null, true);
};

Social.prototype.init = function (container, handle) {
  if (!handle.length || !(container instanceof window.HTMLElement)) {
    return;
  }
  this.handle = handle;
  this.container = container;
  var local = this.getLocal();
  if (local) {
    this.render(local.data);
  }
  this.getContent();
};