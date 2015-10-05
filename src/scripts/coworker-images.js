(function () {
  'use strict';

  function imageElement(src, className) {
    var node = new Image();
    node.crossOrigin = 'anonymous';
    node.className = className;
    node.src = src || '';
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

  function desaturate(ctx, width, height) {
    var imageData = ctx.getImageData(0, 0, width, height);
    var pixels = imageData.data;

    var r, g, b, a, average;

    for (var i = 0, l = pixels.length; i < l; i += 4) {
      a = pixels[i + 3];
      if (a === 0) {
        continue;
      }

      r = pixels[i];
      g = pixels[i + 1];
      b = pixels[i + 2];

      average = (r + g + b) / 3 >>> 0;
      pixels[i] = pixels[i + 1] = pixels[i + 2] = average;
    }

    ctx.putImageData(imageData, 0, 0);
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
      image = imageElement(saved, className);
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
      var width = template.getAttribute('width') || 320;
      var height = template.getAttribute('height') || 200;

      var ctx = canvas.getContext('2d');

      width = Math.min(width, image.width);
      height = Math.min(height, image.height);

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, 0, 0);

      desaturate(ctx, width, height);

      ctx.globalCompositeOperation = 'color';
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.fillStyle = '#668cff';
      ctx.fillRect(0, 0, width, height);

      var base64 = canvas.toDataURL();

      update(src, base64);

      image = imageElement(base64, className);

      replace(true);
    };
  });

})();
