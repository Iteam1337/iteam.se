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
      var node = document.createElement('li');
      var h4 = document.createElement('h4');
      var a = document.createElement('a');
      var small = document.createElement('small');
      var tempNode = document.createElement('pre');
      a.setAttribute('href', data.link);
      a.setAttribute('target', '_blank');

      tempNode.innerHTML = data.content;
      var smallHTML = (tempNode.textContent || tempNode.innerText || '');
      if (smallHTML.length >= 80) {
        smallHTML = dashesAtFirstSpace(smallHTML, 80);
      }
      small.innerHTML = smallHTML;

      tempNode.innerHTML = data.title;
      var titleHTML = (tempNode.textContent || tempNode.innerText || '');
      if (titleHTML.length >= 30) {
        titleHTML = dashesAtFirstSpace(titleHTML, 30);
      }
      h4.innerHTML = titleHTML;

      a.appendChild(h4);
      a.appendChild(small);
      node.appendChild(a);

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
