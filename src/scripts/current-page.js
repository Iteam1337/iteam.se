(function () {
  'use strict';

  var path = window.location.pathname.split('/')[1];
  var navbar = document.querySelectorAll('#navbar ul li');

  for (var i = 0; i < navbar.length; i++) {
    var child = navbar[i].children[0];

    if (child.getAttribute('href').substr(1) === path) {
      child.classList.add('active');
    }
  }

})();
