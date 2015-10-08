(function () {
  'use strict';

  function get(url, data) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var URLObj = window.URL || window.webkitURL;
      var response = URLObj.createObjectURL(this.response);
      data(response);
      URL.revokeObjectURL(response);
    };
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.send();
  }

  function imageElement(src, className, saved) {
    var node = new Image();
    if (!saved) {
      get(src || '', function (response) {
        node.src = response;
      });
    } else {
      node.src = src;
    }
    node.crossOrigin = 'anonymous';
    node.className = className;
    return node;
  }

  function identifier(src) {
    return src
      .replace(/.+?avatar\//i, '')
      .replace(/[^\w\d]/g, '');
  }

  function getLocalStorage() {
    var local = window.localStorage.getItem('savedSrcs');
    if (local === null) {
      return {};
    }

    var parsed = JSON.parse(local);

    if (!parsed ||
        !parsed.hasOwnProperty('date') &&
        !parsed.hasOwnProperty('data')) {
      return {};
    }

    var oneDay = 1000 * 60 * 60 * 24;
    if ((parsed.date + oneDay) >= Date.now()) {
      return parsed.data;
    }
    return {};
  }

  function setLocalStorage() {
    var saved = {
      date: Date.now(),
      data: savedSrcs
    }
    var stringified = JSON.stringify(saved);
    window.localStorage.setItem('savedSrcs', stringified);
  }

  function getSaved(src) {
    if (savedSrcs === null) {
      return null;
    }
    var saved = savedSrcs[identifier(src)];
    if (!saved) {
      return null;
    }
    return saved;
  }

  function update(src, base64) {
    savedSrcs[identifier(src)] = base64;
  }

  function isItDone() {
    if (elements.length !== done.length) {
      return;
    }
    if (done.filter(function (n) { return n === true; }).length) {
      setLocalStorage();
    }
  }

  var isCanvasSupported = (function () {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  })();

  var savedSrcs = getLocalStorage();
  var elements = Array.prototype.slice.call(document.querySelectorAll('template'));
  var done = [];

  elements.forEach(function (template) {
    function replace(updated) {
      done.push(!!updated);
      set = true;
      template.parentNode.replaceChild(image, template);
    }

    var image = null;
    var src = template.getAttribute('image');
    var className = template.className;
    var set = false;
    var saved = getSaved(src);

    if (saved !== null) {
      image = imageElement(saved, className, true);
      replace();
      return;
    }

    image = imageElement(src, className);

    if (!isCanvasSupported) {
      replace();
      return;
    }

    image.onload = function () {

      if (set) {
        isItDone();
        image.onload = function () {};
        return;
      }

      var canvas = document.createElement('canvas');
      var width =  Math.min(template.getAttribute('width') || 320, image.width);
      var height = Math.min(template.getAttribute('height') || 200, image.height);
      var ctx = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, 0, 0);

      ctx.globalCompositeOperation = 'color';
      ctx.globalAlpha = 1;
      ctx.beginPath();

      ctx.beginPath();
      ctx.fillStyle = '#668cff';
      ctx.fillRect(0, 0, width, height);

      var base64 = canvas.toDataURL();

      update(src, base64);

      image = imageElement(base64, className, true);

      replace(true);
    };
  });

})();

