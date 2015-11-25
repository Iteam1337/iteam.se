(function () {
  'use strict';

  /**
   * Social is a superclass that should be extended.
   * @param {string} type  twitter, instagram and github is used at the moment
   * @param {number} count defines how many elements that should be saved
   */
  function Social(type, count) {
    this.type = type.toLowerCase();
    this.count = count || 3;

    this.handle = '';
    this.container = null;

    this.url = '';
  }

  Social.prototype.storageName = function (){
    return this.type + '.' + this.handle;
  };
  /**
   * Extend:
   * This should return a string of where the
   * content should be fetched from.
   *
   * @return {string}
   */
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

  Social.prototype.toggleVisibility = function (hide) {
    var hidden = /(?:^|\\s)hidden(?:$|\\s)/gi;
    var isVisible = (this.hideOnEmpty.className.match(hidden) !== null);
    if (hide) {
      this.hideOnEmpty.className += ' hidden';
    } else {
      this.hideOnEmpty.className = this.hideOnEmpty.className.replace(hidden, '');
    }
  };

  Social.prototype.save = function (array) {
    if (!array || !array.length) {
      if (this.hideOnEmpty) {
        this.toggleVisibility(true);
      }
      return;
    }

    if (this.hideOnEmpty) {
      this.toggleVisibility();
    }

    var data = array[0];
    var latest = array[1];
    if (array instanceof Array === false || latest === undefined) {
      return;
    }

    var local = this.getLocal();
    data.splice(this.count);
    var ignoreSave = (local !== null && (local.data && local.latest) && (data.length === local.data.length && local.latest === latest));

    if (ignoreSave) {
      // console.info('ignoring save: %s', this.storageName());
      return;
    }

    window.localStorage.setItem(this.storageName(), JSON.stringify({
      'data': data,
      'latest': latest
    }));

    this.render(data);
  };

  Social.prototype.updateNode = function (newElement) {
    newElement.className = this.container.className;
    newElement.style.cssText = this.container.style.cssText;
    this.container.parentNode.replaceChild(newElement, this.container);
    this.container = newElement;
  };

  Social.prototype.draw = function (html) {
    this.updateNode(this.container, html);
  };

  /**
   * Extend:
   * This should return a valid htmlelement that will be printed
   * to the page.
   *
   * @param  {array}       array
   * @return {HTMLElement}
   */
  Social.prototype.prerender = function (array) {};

  Social.prototype.render = function (array) {
    if (!array ||
        !array.length) {
      return;
    }
    var newElement = this.prerender(array);
    if (newElement instanceof window.HTMLElement) {
      this.updateNode(newElement);
    }
  };

  /**
   * This should return an array of data and the latest timestamp
   *
   * @param  {object} response    a response from the httpRequest
   * @return {[array, timestamp]}
   */
  Social.prototype.handleResponse = function (response) {
    console.info('constructor');
  };

  Social.prototype.getContent = function () {
    var self = this;
    var xhr = new window.XMLHttpRequest();

    xhr.onload = function () {
      if (xhr.statusText !== 'OK') {
        return;
      }
      self.save(self.handleResponse(xhr.responseText));
    };
    xhr.onerror = function () {
      console.error(xhr.responseText);
    };
    xhr.open('GET', this.URL());
    xhr.send(null, true);
  };

  Social.prototype.init = function (container, handle, hideOnEmpty) {
    if (!handle.length || !(container instanceof window.HTMLElement)) {
      return;
    }

    if (hideOnEmpty && hideOnEmpty.length) {
      this.hideOnEmpty = hideOnEmpty[0];
    }

    this.handle = handle;
    this.container = container;
    var local = this.getLocal();
    if (local) {
      this.render(local.data);
    }
    this.getContent();
  };

  window.Social = Social;
})();
