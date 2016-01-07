'use strict'

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var proxyquire = require('proxyquire')

describe('#pages', function () {
  var image
  var pages
  var options
  var front
  var read

  beforeEach(function () {
    front = {
      loadFront: sinon.stub().returns({
        name: 'foo',
        email: 'rickard.laurin@iteam.se'
      })
    }
    read = {
      directory: sinon.stub().returns(['foo'])
    }
    image = {
      gravatar: sinon.stub().returns('https://www.gravatar.com')
    }

    options = {
      fn: sinon.spy()
    }

    pages = proxyquire(process.cwd() + '/src/helpers/pages', {
      './gravatar': image,
      './read': read,
      'yaml-front-matter': front
    })
  })

  it('should be a function', function () {
    expect(pages).to.be.a('function')
  })

  it('should add a lead character to the url', function () {
    options.hash = {
      route: './src/pages/',
      start: '/'
    }

    pages(options)

    expect(options.fn).calledOnce
    expect(options.fn.args[0][0].data[0]).eql({
      frontmatter: {
        name: 'foo',
        email: 'rickard.laurin@iteam.se'
      },
      menutitle: '',
      logo: '',
      title: 'foo',
      url: '/foo'
    })
  })

  it('should call the handler when given a route', function () {
    options.hash = { route: './src/pages/' }

    pages(options)

    expect(options.fn).calledOnce
    expect(options.fn.args[0][0].data[0]).eql({
      frontmatter: {
        name: 'foo',
        email: 'rickard.laurin@iteam.se'
      },
      logo: '',
      title: 'foo',
      menutitle: '',
      url: 'foo'
    })
  })

  it('should get the gravatars if it is a coworker', function () {
    options.hash = {
      route: './src/pages/team/',
      type: 'coworker'
    }

    pages(options)

    expect(image.gravatar)
      .called
      .and
      .calledWith('rickard.laurin@iteam.se', false)
  })

  it('should filter pages by category if category is an option', function () {
    read.directory.returns(['foo', 'bar'])
    front.loadFront.withArgs('./src/pages/case/foo/index.hbs').returns({
      name: 'foo',
      categories: ['tldr']
    })
    front.loadFront.withArgs('./src/pages/case/bar/index.hbs').returns({
      name: 'bar',
      categories: ['test']
    })
    options.hash = {
      category: 'test'
    }

    pages(options)

    expect(options.fn.args[0][0].data[0]).eql({
      frontmatter: {
        name: 'bar',
        categories: 'test',
        categoriesHTMLFriendly: 'test'
      },
      logo: '',
      menutitle: '',
      title: 'bar',
      url: 'bar'
    })
  })

  it('should sort by last name', function () {
    read.directory.returns(['foo', 'bar'])
    front.loadFront.withArgs('./src/pages/team/foo/index.hbs').returns({
      name: 'foo foo',
      email: 'rickard.laurin@iteam.se'
    })
    front.loadFront.withArgs('./src/pages/team/bar/index.hbs').returns({
      name: 'bar bar',
      email: 'radu.achim@iteam.se'
    })
    options.hash = {
      route: './src/pages/team/',
      type: 'coworker'
    }
    pages(options)
    expect(options.fn.args[0][0].data[0], 'first').eql({
      frontmatter: {
        name: 'bar bar',
        email: 'radu.achim@iteam.se'
      },
      name: {
        first: 'bar',
        last: 'bar'
      },
      logo: 'https://www.gravatar.com',
      menutitle: '',
      title: 'bar bar',
      url: 'bar'
    })
    expect(options.fn.args[0][0].data[1], 'second').eql({
      frontmatter: {
        name: 'foo foo',
        email: 'rickard.laurin@iteam.se'
      },
      name: {
        first: 'foo',
        last: 'foo'
      },
      logo: 'https://www.gravatar.com',
      menutitle: '',
      title: 'foo foo',
      url: 'foo'
    })
  })
})
