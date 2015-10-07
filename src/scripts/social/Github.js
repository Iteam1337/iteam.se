(function () {
  'use strict';

  function Github(count) {
    window.Social.apply(this, ['github', count]);
    this.url = 'https://api.github.com/users/{user}/repos';
  }

  Github.prototype = Object.create(window.Social.prototype);

  Github.prototype.URL = function () {
    return this.url.replace('{user}', this.handle);
  };

  Github.prototype.handleResponse = function (response) {
    response = JSON.parse(response);

    if (!response.length) {
      return;
    }

    return [response, response[0].pushed_at];
  };

  Github.prototype.prerender = function (array) {
    var newElement = document.createElement('ul');

    array.forEach(function (data, i) {
      var a = document.createElement('a');
      a.setAttribute('href', data.html_url);
      a.setAttribute('target', '_blank');
      a.innerHTML = data.name;

      var p = document.createElement('p');
      p.innerHTML = data.description;

      var node = document.createElement('li');
      node.appendChild(a);
      node.appendChild(p);

      newElement.appendChild(node);
    });

    return newElement;
  };

  Github.prototype.constructor = window.Social;

  window.Github = Github;
})();
