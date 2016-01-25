(function () {
  'use strict';

  function toggle() {
    document.documentElement.classList.toggle('open');
  }

  var navicon = document.getElementsByClassName('navicon');
  var close = document.getElementById('close-navbar');

  if (navicon && navicon.length) {
    Array
      .prototype
      .slice
      .call(navicon)
      .forEach(function (element) {
        element.addEventListener('click', toggle);
      });
    close.addEventListener('click', toggle);
  }

  window.onscroll = function () {
    document
      .body
      .style
      .webkitPerspectiveOrigin = window.scrollX + 'px ' + window.scrollY + 'px';
  };

  var header = document.getElementById('navbar');
  if (header === null) {
    return;
  }
  var headerHeight = header.offsetHeight;

  var visible = window.scrollY < headerHeight;

  if (!visible) {
    document.documentElement.classList.add('nav-off-screen');
  }

  function scrollEvent() {
    var y = window.scrollY;
    if (y === undefined) {
      return;
    }

    if (y < headerHeight) {
      if (!visible) {
        visible = true;
        document.documentElement.classList.remove('nav-off-screen');
      }
      return;
    }

    if (visible) {
      visible = false;
      document.documentElement.classList.add('nav-off-screen');
    }
  }

  window.addEventListener('resize', function () {
    headerHeight = header.offsetHeight;
  }, false);

  window.addEventListener('scroll', scrollEvent, false);
})();
