(function () {
  'use strict';

  var attr = [
    'data-{type}-query',
    'data-{type}-count',
    'data-{type}-resolution',
    'data-{type}-hide-on-empty',
    'data-{type}-full-information'
  ];

  ['twitter', 'instagram', 'github', 'blog', 'blog-iteam', 'meetup']
    .forEach(function (type) {
      function getAttributeString(pos) {
        return attr[pos].replace('{type}', type);
      }
      function getAttributeValue(string) {
        return container.getAttribute(string);
      }

      var query = getAttributeString(0);
      var count = getAttributeString(1);
      var resolution = getAttributeString(2);
      var fullInformation = getAttributeString(4);

      var container = document.querySelectorAll('[' + query + ']');
      if (!container.length) {
        return;
      }
      container = container[0];

      query = getAttributeValue(query);
      count = getAttributeValue(count) || 3;
      resolution = getAttributeValue(resolution) || '';
      fullInformation = getAttributeValue(fullInformation) === 'true' ? true : false;

      var clearOnEmpty = document.querySelectorAll('[' + getAttributeString(3) + ']');

      switch (type) {
      case 'twitter':
      case 'instagram':
        new SocialHub(type, count, resolution).init(container, query, clearOnEmpty);
        break;
      case 'blog':
        new Blog(count).init(container, query, clearOnEmpty);
        break;
      case 'blog-iteam':
        new BlogIteam(count, fullInformation).init(container, clearOnEmpty);
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
