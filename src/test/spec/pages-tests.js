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
    helper.pages({
      route: './src/pages/', 
      start: '/'
    }, options);
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
    helper.pages({ route: './src/pages/' }, options);
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
    helper.pages({
      route: './src/pages/medarbetare/', 
      type: 'coworker'
    }, options);
    expect(image.gravatar).called.and.calledWith('rickard.laurin@iteam.se', false);
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
    helper.pages({
      route: './src/pages/medarbetare/',
      type: 'coworker'
    }, options);
    expect(options.fn).calledWith({
      data: [{
        frontmatter: {
          name: 'bar',
          email: 'radu.achim@iteam.se'
        },
        logo: 'http://www.gravatar.com',
        title: 'bar',
        url: 'bar'
      }, {
        frontmatter: {
          name: 'foo',
          email: 'rickard.laurin@iteam.se'
        },
        logo: 'http://www.gravatar.com',
        title: 'foo',
        url: 'foo'
      }]
    });
  });
});