var attribute, container;

attribute = 'data-twitter-user';
container = document.querySelectorAll('[' + attribute + ']');

if (container.length) {
  container = container[0];
  var attr = container.getAttribute(attribute);
  new SocialHub('twitter', 1).init(container, attr);
}

attribute = 'data-github-username';
var github_count = 'data-github-count';

container = document.querySelectorAll('[' + attribute + ']');

if (container.length) {
  container = container[0];

  var count = container.getAttribute(github_count) || 3;
  var username = container.getAttribute(attribute);
  new Github(count).init(container, username);
}

attribute = 'data-blog-url';
container = document.querySelectorAll('[' + attribute + ']');

if (container.length) {
  container = container[0];
  var url = container.getAttribute(attribute);
  var count = container.getAttribute('data-blog-count');
  new Blog(count)._init(container, url);
}