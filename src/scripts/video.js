(function () {
  'use strict';

  var videoElements = document.querySelectorAll('video[playbackrate]');
  if (!videoElements.length) {
    return;
  }

  Array.prototype.slice.call(videoElements).forEach(function (element) {
    var playbackRate = element.getAttribute('playbackrate');
    element.playbackRate = playbackRate;
  });
})();
