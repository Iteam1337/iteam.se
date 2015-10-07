(function () {
  'use strict'

  function Blog(count) {
    window.Social.apply(this, ['blog', count]);
    this.baseURL = '//feed.insta-team.se/rss?url={url}&count={count}';
  }

  Blog.prototype = Object.create(window.Social.prototype); // extending Social
  Blog.prototype.super = Blog.prototype.init;

  Blog.prototype.init = function (container, url) {
    this.url = url;
    return this.super(container, url.replace(/\W/g, ''));
  };

  Blog.prototype.URL = function () {
    return this.baseURL
      .replace('{url}', escape(this.url))
      .replace('{count}', this.count);
  };

  Blog.prototype.prerender = function (array) {
    var newElement = document.createElement('ul');

    array.forEach(function (data, i) {
      var h3 = document.createElement('h3');
      var a = document.createElement('a');
      a.setAttribute('href', data.link);
      a.setAttribute('target', '_blank');
      a.innerHTML = data.title;

      var tempNode = document.createElement('pre');
      tempNode.innerHTML = data.content;

      var p = document.createElement('p');
      p.innerHTML = (tempNode.textContent || tempNode.innerText || '').slice(0, 120) + ' …';

      var node = document.createElement('li');

      h3.appendChild(a);
      node.appendChild(h3);
      node.appendChild(p);

      newElement.appendChild(node);
    });

    return newElement;
  };

  Blog.prototype.handleResponse = function (response) {
    response = JSON.parse(response).data;
    return [response, response[0].pubDate];
  };

  Blog.prototype.constructor = window.Social;

  window.Blog = Blog;
})();
