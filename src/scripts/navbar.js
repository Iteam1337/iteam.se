(function () {
  'use strict';

  function toggle() {
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

  var header = document.getElementById('navbar');
  if (header === null) {
    return
  }
  var headerHeight = header.offsetHeight;

  var visible = window.scrollY < headerHeight;

  if (!visible) {
    document.documentElement.classList.add('nav-off-screen');
  }

  function scrollEvent(event) {
    if (!event.view || event.view.scrollY === undefined) {
      return;
    }
    var y = event.view.scrollY;
    if (y < headerHeight) {
      if (!visible) {
        visible = true;
        document.documentElement.classList.remove('nav-off-screen');
      }
    } else {
      if (visible) {
        visible = false;
        document.documentElement.classList.add('nav-off-screen');
      }
    }
  }

  window.addEventListener('resize', function () {
    headerHeight = header.offsetHeight;
  }, false)

  window.addEventListener('scroll', scrollEvent, false);
  window.addEventListener('touchmove', scrollEvent, false);
  window.addEventListener('touchend', scrollEvent, false);
})();
