(function () {
  'use strict';

  var paths = window.location.pathname.split('/');
  var firstPath = '/' + paths[1];
  var secondPath = '/' + paths[1] + '/' + paths[2];
  var navbar = document.querySelectorAll('#navbar ul li');

  for (var i = 0; i < navbar.length; i++) {
    var children = navbar[i].children;
    var child = children[0];
    var childHref = child.getAttribute('href');
    var subChild = children[1] ? children[1].children[0] : null;
    var subChildHref = subChild ? subChild.getAttribute('href') : null;

    if (childHref === firstPath) {
      child.classList.add('active');
    }

    if (secondPath && subChildHref === secondPath) {
      subChild.classList.add('active');
    }
  }
})();
