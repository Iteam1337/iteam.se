var tweet = new Social('twitter', 1);
var attribute = 'data-twitter-user';
var container = document.querySelectorAll('[' + attribute + ']');

if (container.length) {
  container = container[0];
  var attr = container.getAttribute(attribute);
  tweet.init(container, attr);
}