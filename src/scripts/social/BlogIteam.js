(function () {
  'use strict';

  function BlogIteam(count, fullInformation) {
    window.Social.apply(this, ['blog-iteam', count]);

    this.fullInformation = fullInformation;
    this.url = 'https://feed.iteamdev.se/iteam?count={count}';
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
    var self = this;

    array.forEach(function (data) {
      var node = document.createElement('li');
      var h4 = document.createElement('h4');
      var a = document.createElement('a');
      var small = document.createElement('p');
      var tempNode = document.createElement('pre');
      a.setAttribute('href', data.link);
      a.setAttribute('target', '_blank');

      h4.classList.add('blog__title');
      small.classList.add('blog__intro');

      tempNode.innerHTML = data.content;
      var smallHTML = (tempNode.textContent || tempNode.innerText || '');
      if (smallHTML.length >= 100 && !self.fullInformation) {
        smallHTML = dashesAtFirstSpace(smallHTML, 100);
      }
      small.innerHTML = smallHTML;

      tempNode.innerHTML = data.title;
      var titleHTML = (tempNode.textContent || tempNode.innerText || '');
      if (titleHTML.length >= 50 && !self.fullInformation) {
        titleHTML = dashesAtFirstSpace(titleHTML, 50);
      }
      h4.innerHTML = titleHTML;

      a.appendChild(h4);
      a.appendChild(small);

      if (self.fullInformation) {
        var meta = document.createElement('div');
        var creator = document.createElement('div');
        var date = document.createElement('div');

        meta.classList.add('blog__meta');
        creator.classList.add('blog__creator');
        date.classList.add('blog__date');

        creator.innerHTML = data.creator;
        date.innerHTML = new Date(data.pubDate).toISOString().slice(0, 10);

        meta.appendChild(creator);
        meta.appendChild(date);
        a.appendChild(meta);
      }

      node.appendChild(a);

      if (data.image) {
        var imageElement = document.createElement('div');
        node.className = 'contains-background';
        imageElement.className = 'background-element';
        imageElement.style.backgroundImage = 'url(' + data.image + ')';
        node.appendChild(imageElement);
      }

      newElement.appendChild(node);
    });

    if (array.length === 5) {
      var more = document.createElement('li');
      var readMoreLink = document.createElement('a');
      var readMore = document.createElement('h4');
      readMore.classList.add('blog__title');

      readMoreLink.setAttribute('href', '/blog');
      readMore.innerHTML = 'More blog posts';

      readMoreLink.appendChild(readMore);
      more.appendChild(readMoreLink);
      newElement.appendChild(more);
    }

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
