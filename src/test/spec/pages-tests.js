'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('#pages', () => {
  let gravatar
  let pages
  let options
  let front
  let directory

  beforeEach(() => {
    front = {
      loadFront: sinon.stub().returns({
        name: 'foo',
        layout: 'coworker',
        email: 'rickard.laurin@iteam.se'
      })
    }
    directory = sinon.stub().returns(['foo'])
    gravatar = sinon.stub().returns('https://www.gravatar.com')

    options = {
      fn: sinon.spy()
    }

    pages = proxyquire(`${process.cwd()}/src/helpers/pages`, {
      './gravatar': gravatar,
      './directory': directory,
      'yaml-front-matter': front
    })
  })

  it('should be a function', () => {
    expect(pages).to.be.a('function')
  })

  it('should add a lead character to the url', () => {
    options.hash = {
      route: './src/pages/',
      start: '/',
      type: 'coworker'
    }

    pages(options)

    expect(options.fn).calledOnce
    expect(options.fn.args[0][0].data[0]).eql({
      frontmatter: {
        name: 'foo',
        layout: 'coworker',
        email: 'rickard.laurin@iteam.se'
      },
      menutitle: '',
      logo: 'https://www.gravatar.com',
      title: 'foo',
      url: '/foo',
      subpages: null,
      name: {
        first: 'foo',
        last: null
      }
    })
  })

  it('should call the handler when given a route', () => {
    options.hash = {
      route: './src/pages/',
      type: 'coworker'
    }

    pages(options)

    expect(options.fn).calledOnce
    expect(options.fn.args[0][0].data[0]).eql({
      frontmatter: {
        name: 'foo',
        layout: 'coworker',
        email: 'rickard.laurin@iteam.se'
      },
      logo: 'https://www.gravatar.com',
      title: 'foo',
      menutitle: '',
      url: 'foo',
      name: {
        first: 'foo',
        last: null
      },
      subpages: null
    })
  })

  it('should get the gravatars if it is a coworker', () => {
    options.hash = {
      route: './src/pages/team/',
      type: 'coworker'
    }

    pages(options)

    expect(gravatar)
      .called
      .and
      .calledWith('rickard.laurin@iteam.se', false)
  })

  xit('should sort by last name', () => {
    directory.returns(['foo', 'bar'])
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
