(function () {
  'use strict';

  function Blog(count) {
    window.Social.apply(this, ['blog', count]);
    this.baseURL = '//feed.iteamdev.se/rss?url={url}&count={count}';
  }

  Blog.prototype = Object.create(window.Social.prototype); // extending Social
  Blog.prototype.super = Blog.prototype.init;

  Blog.prototype.init = function (container, url) {
    if (url === 'iteam') {
      this.baseURL = '//feed.iteamdev.se/iteam?count={count}'
    }
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
      var pText = (tempNode.textContent || tempNode.innerText || '');
      if (pText.length >= 80) {
        pText = dashesAtFirstSpace(pText, 80);
      }
      p.innerHTML = pText;

      var node = document.createElement('li');

      h3.appendChild(a);
      node.appendChild(h3);
      node.appendChild(p);

      newElement.appendChild(node);
    });

    return newElement;
  };

  Blog.prototype.handleResponse = function (response) {
    try {
      response = JSON.parse(response).data;

      if (response && response.length && response[0].pubDate) {
        return [response, response[0].pubDate];
      }
    } catch (error) {
      console.error(error);
    }

    return [[], 0];
  };

  Blog.prototype.constructor = window.Social;

  window.Blog = Blog;
})();
