var attribute, container;

attribute = 'data-twitter-user';
container = document.querySelectorAll('[' + attribute + ']');

if (container.length) {
  container = container[0];
  var attr = container.getAttribute(attribute);
  new SocialHub('twitter', 1).init(container, attr);
}

attribute = 'data-github-username';
container = document.querySelectorAll('[' + attribute + ']');

if (container.length) {
  container = container[0];
  var username = container.getAttribute(attribute);
  new Github().init(container, username);
}

attribute = 'data-blog-url';
container = document.querySelectorAll('[' + attribute + ']');

if (container.length) {
  container = container[0];
  var url = container.getAttribute(attribute);
  var count = container.getAttribute('data-blog-count');
  new Blog(count)._init(container, url);
}