'use strict';
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('#pages', function () {
  var image;
  var helper;
  var options;
  var front;
  var read;

  beforeEach(function () {
    front = {
      loadFront: sinon.stub().returns({
        name: 'foo',
        email: 'rickard.laurin@iteam.se'
      })
    };
    read = {
      directory: sinon.stub().returns(['foo'])
    };
    image = {
      gravatar: sinon.stub().returns('http://www.gravatar.com')
    };

    options = {
      fn: sinon.spy()
    };

    helper = proxyquire(process.cwd() + '/src/helpers/pages', {
      './gravatar': image,
      './read': read,
      'yaml-front-matter': front
    });
  });

  it('should be a function', function () {
    expect(helper.pages).to.be.a('function');
  });

  it('should add a lead character to the url', function () {
    options.hash = {
      route: './src/pages/',
      start: '/'
    };
    helper.pages(options);
    expect(options.fn).calledOnce;
    expect(options.fn).calledWith({
      data: [{
        frontmatter: {
          name: 'foo',
          email: 'rickard.laurin@iteam.se'
        },
        logo: '',
        title: 'foo',
        url: '/foo'
      }]
    });
  });

  it('should call the handler when given a route', function () {
    options.hash = { route: './src/pages/' }; 
    helper.pages(options);
    expect(options.fn).calledOnce;
    expect(options.fn).calledWith({
      data: [{
        frontmatter: {
          name: 'foo',
          email: 'rickard.laurin@iteam.se'
        },
        logo: '',
        title: 'foo',
        url: 'foo'
      }]
    });
  });

  it('should get the gravatars if it is a coworker', function () {
    options.hash = {
      route: './src/pages/medarbetare/', 
      type: 'coworker'
    };
    helper.pages(options);
    expect(image.gravatar).called.and.calledWith('rickard.laurin@iteam.se', false);
  });

  it('should filter pages by category if category is an option', function () {
    read.directory.returns(['foo', 'bar']);
    front.loadFront.withArgs('./src/pages/case/foo/index.hbs').returns({
      name: 'foo',
      categories: ['tl;dr']
    });
    front.loadFront.withArgs('./src/pages/case/bar/index.hbs').returns({
      name: 'bar',
      categories: ['test']
    });
    options.hash = { category: 'test' };
    helper.pages(options);
    expect(options.fn).calledWith({
      data: [{
        frontmatter: {
          name: 'bar',
          categories: 'test',
          categoriesHTMLFriendly: 'test'
        },
        logo: '',
        title: 'bar',
        url: 'bar'
      }]
    });
  });

  it('should sort by last name', function () {
    read.directory.returns(['foo', 'bar']);
    front.loadFront.withArgs('./src/pages/medarbetare/foo/index.hbs').returns({
      name: 'foo',
      email: 'rickard.laurin@iteam.se'
    });
    front.loadFront.withArgs('./src/pages/medarbetare/bar/index.hbs').returns({
      name: 'bar',
      email: 'radu.achim@iteam.se'
    });
    options.hash = {
      route: './src/pages/medarbetare/', 
      type: 'coworker' 
    };
    helper.pages(options);
    expect(options.fn).calledWith({
      data: [{
        frontmatter: {
          name: 'bar',
          email: 'radu.achim@iteam.se'
        },
        name: {
          first:'',
          last:'bar'
        },
        logo: 'http://www.gravatar.com',
        title: 'bar',
        url: 'bar'
      }, {
        frontmatter: {
          name: 'foo',
          email: 'rickard.laurin@iteam.se'
        },
        name: {
          first:'',
          last:'foo'
        },
        logo: 'http://www.gravatar.com',
        title: 'foo',
        url: 'foo'
      }]
    });
  });
});