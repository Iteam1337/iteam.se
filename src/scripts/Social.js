'use strict';

/**
 * Social is a superclass that should be extended.
 * @param {string} type  twitter, instagram and github is used at the moment
 * @param {number} count defines how many elements that should be saved
 */
function Social(type, count) {
  this.storageName = function () {
    return type + '.' + this.handle;
  };
  this.type = type.toLowerCase();
  this.count = count || 3;

  this.handle = '';
  this.container = null;

  this.url = '';
}

Social.prototype.URL = function () {
  return this.url;
};

Social.prototype.getLocal = function () {
  var local = window.localStorage.getItem(this.storageName());
  if (local === null) {
    return null;
  }
  return JSON.parse(local);
};

Social.prototype.save = function (data, latest, renderOnSuccess) {
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

  if (renderOnSuccess === true) {
    this.render(data);
  }
};

Social.prototype.updateNode = function (newElement) {
  this.container.parentNode.replaceChild(newElement, this.container);
  this.container = newElement;
};

Social.prototype.draw = function (html) {
  this.updateNode(this.container, html);
};

Social.prototype.prerender = function (object) {};

Social.prototype.render = function (object) {
  if (!object ||
      !object.length) {
    return;
  }
  var newElement = this.prerender(object);
  if (newElement === undefined) {
    return;
  }
  this.updateNode(newElement);
};

Social.prototype.handleResponse = function (response) {};

Social.prototype.getContent = function () {
  var self = this;
  var xhr = new window.XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.statusText !== 'OK') {
      return;
    }
    return self.handleResponse(xhr.responseText);
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