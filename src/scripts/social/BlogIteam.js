(function () {
  'use strict';

  function BlogIteam(count) {
    window.Social.apply(this, ['blog-iteam', count]);
    this.url = '//feed.iteamdev.se/iteam?count={count}';
  }

  BlogIteam.prototype = Object.create(window.Social.prototype);
  BlogIteam.prototype.super = BlogIteam.prototype.init;

  BlogIteam.prototype.init = function (container) {
    return this.super(container, this.url);
  };

  BlogIteam.prototype.URL = function () {
    return this.url
      .replace('{count}', this.count);
  };

  BlogIteam.prototype.prerender = function (array) {
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

      if (data.image) {
        var imageElement = document.createElement('div');
        node.className = 'contains-background';
        imageElement.className = 'background-element';
        imageElement.style.backgroundImage = 'url(' + data.image + ')';
        node.appendChild(imageElement)
      }

      newElement.appendChild(node);
    });

    return newElement;
  };


  BlogIteam.prototype.handleResponse = function (response) {
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

  BlogIteam.prototype.constructor = window.BlogIteam;

  window.BlogIteam = BlogIteam;
})();
