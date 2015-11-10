(function () {
  'use strict';

  function toggle () {
    document.getElementById('navbar').classList.toggle('open');
  }

  var navicon = document.getElementsByClassName('navicon');
  var close = document.getElementById('close-navbar');

  if (navicon && navicon.length) {
    Array.prototype.slice.call(navicon).forEach(function (element) {
      element.addEventListener('click', toggle);
    });
    close.addEventListener('click', toggle);
  }

  window.onscroll = function () {
    document.body.style.webkitPerspectiveOrigin = window.scrollX + 'px ' + window.scrollY + 'px';
  };
})();
