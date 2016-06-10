(function () {
  'use strict';

  var content;

  function animate(element, visible) {
    if (visible) {
      element.classList.add('animate');
    } else {
      element.classList.remove('animate');
    }
  }

  function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (rect.top <= window.innerHeight);
  }

  function update() {
    for (var i = 0, max = content.length, element; i < max; i++) {
      element = content[i];
      animate(element, isElementInViewport(element));
    }
  }

  function setOptions(element) {
    var prefixes = ['-webkit-', '-moz-', '-ms-', '-o-', '', ''];
    var delay = element.getAttribute('data-delay') || '0';
    delay = prefixes.join('animation-delay:' + delay + ';');

    var duration = element.getAttribute('data-duration') || '5s';
    duration = prefixes.join('animation-duration:' + duration + ';');

    var css = delay + duration + element.style.cssText;
    element.style.cssText = css;
  }

  content = document.getElementsByClassName('animated');

  if (content.length) {
    for (var i = 0, max = content.length; i < max; i++) {
      setOptions(content[i]);
    }
    update();
    window.addEventListener('scroll', update, false);
  }
})();
