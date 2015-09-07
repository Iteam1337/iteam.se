'use strict'

function Blog (count) {
  Social.apply(this, ['blog', count])
  this.baseURL = '//feed.insta-team.se/rss?url={url}&count={count}'
}

Blog.prototype = Object.create(Social.prototype)
Blog.prototype.constructor = Social

Blog.prototype._init = function (container, url) {
  this.url = url
  return this.init(container, url.replace(/\W/g, ''))
}

Blog.prototype.URL = function () {
  return this.baseURL
    .replace('{url}', escape(this.url))
    .replace('{count}', this.count)
}

Blog.prototype.prerender = function (array) {
  var newElement = document.createElement('ul')
  var node, a, p, tempNode, h3
  for (var i = 0, max = array.length, data; i < max; i++) {
    data = array[i]

    h3 = document.createElement('h3')
    a = document.createElement('a')
    a.setAttribute('href', data.link)
    a.setAttribute('target', '_blank')
    a.innerHTML = data.title

    tempNode = document.createElement('pre')
    tempNode.innerHTML = data.content

    p = document.createElement('p')
    p.innerHTML = (tempNode.textContent || tempNode.innerText || '').slice(0, 120) + ' …'

    node = document.createElement('li')

    h3.appendChild(a)
    node.appendChild(h3)
    node.appendChild(p)

    newElement.appendChild(node)
  }
  return newElement
}

Blog.prototype.handleResponse = function (response) {
  response = JSON.parse(response).data
  return [response, response[0].pubDate]
}
