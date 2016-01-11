(function () {
  'use strict';

  function dashesAtFirstSpace(string, atChar) {
    function getFirstSpace(slicedString) {
      var last = slicedString.length - 1;
      var lastChar = slicedString[last];

      if (lastChar.match(/\s/) !== null) {
        return slicedString + ' …';
      }
      return getFirstSpace(slicedString.slice(0, last));
    }
    var slice = string.slice(0, atChar);

    return getFirstSpace(slice);
  }

  window.dashesAtFirstSpace = dashesAtFirstSpace;
})();
