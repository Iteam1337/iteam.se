'use strict';

function Github (count) {
  Social.apply(this, ['github', count]);
  this.url = 'https://api.github.com/users/{user}/repos';
}

Github.prototype = Object.create(Social.prototype);
Github.prototype.constructor = Social;

Github.prototype.URL = function () {
  return this.url.replace('{user}', this.handle);
};

Github.prototype.handleResponse = function (response) {
  response = JSON.parse(response);
  return [response, response[0].pushed_at];
};

Github.prototype.prerender = function (array) {
  var newElement = document.createElement('ul');
  var node, a, p;
  for (var i = 0, max = array.length, data; i < max; i++) {
    data = array[i];

    a = document.createElement('a');
    a.setAttribute('href', data.html_url);
    a.setAttribute('target', '_blank');
    a.innerHTML = data.name;

    p = document.createElement('p');
    p.innerHTML = data.description;

    node = document.createElement('li');
    node.appendChild(a);
    node.appendChild(p);

    newElement.appendChild(node);
  }
  return newElement;
};