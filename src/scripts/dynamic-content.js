'use strict';

(function () {
  var _query = 'data-{type}-query';
  var _count = 'data-{type}-count';
  var _resol = 'data-{type}-resolution';

  ['twitter','instagram','github','blog'].forEach(function (type) {
    var query = _query.replace('{type}', type);
    var count = _count.replace('{type}', type);
    var resolution = _resol.replace('{type}', type);

    var container = document.querySelectorAll('[' + query + ']');
    if (!container.length) {
      return;
    }
    container = container[0];
    query = container.getAttribute(query);
    count = container.getAttribute(count) || 3;
    resolution = container.getAttribute(resolution) || '';

    switch (type) {
    case 'twitter':
    case 'instagram':
      new SocialHub(type, count, resolution).init(container, query);
      break;
    case 'blog':
      new Blog(count)._init(container, query);
      break;
    case 'github':
      new Github(count).init(container, query);
      break;
    }
  });
})();