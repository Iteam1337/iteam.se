'use strict';

(function () {
  var attr = [
    'data-{type}-query',
    'data-{type}-count',
    'data-{type}-resolution',
    'data-{type}-hide-on-empty'
  ];

  ['twitter','instagram','github','blog','meetup'].forEach(function (type) {
    function getAttributeString(pos) {
      return attr[pos].replace('{type}', type);
    }
    function getAttributeValue(string) {
      return container.getAttribute(string);
    } 

    var query = getAttributeString(0);
    var count = getAttributeString(1);

    var resolution = getAttributeString(2);

    var container = document.querySelectorAll('[' + query + ']');
    if (!container.length) {
      return;
    }
    container = container[0];

    query = getAttributeValue(query);
    count = getAttributeValue(count) || 3;
    resolution = getAttributeValue(resolution) || '';

    var clearOnEmpty = document.querySelectorAll('[' + getAttributeString(3) + ']');

    switch (type) {
    case 'twitter':
    case 'instagram':
      new SocialHub(type, count, resolution).init(container, query, clearOnEmpty);
      break;
    case 'blog':
      new Blog(count)._init(container, query, clearOnEmpty);
      break;
    case 'github':
      new Github(count).init(container, query, clearOnEmpty);
      break;
    case 'meetup':
      new Meetup(count).init(container, query, clearOnEmpty);
      break;
    }
  });
})();