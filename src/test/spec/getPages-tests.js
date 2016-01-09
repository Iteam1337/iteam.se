'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('#getPages', () => {
  let gravatar
  let getPages
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

    getPages = proxyquire(`${process.cwd()}/src/helpers/getPages`, {
      './gravatar': gravatar,
      './directory': directory,
      'yaml-front-matter': front
    })
  })

  it('should be a function', () => {
    expect(getPages).to.be.a('function')
  })

  it('should add a lead character to the url', () => {
    options.hash = {
      route: './src/pages/',
      start: '/',
      type: 'coworker'
    }

    getPages(options)

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

    getPages(options)

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

    getPages(options)

    expect(gravatar)
      .called
      .and
      .calledWith('rickard.laurin@iteam.se', false)
  })

  it('should sort by last name', () => {
    directory.returns(['foo', 'bar'])

    front
      .loadFront
      .withArgs('./src/pages/team/foo/index.hbs')
      .returns({
        name: 'foo foo',
        email: 'rickard.laurin@iteam.se',
        layout: 'coworker'
      })
    front
      .loadFront
      .withArgs('./src/pages/team/bar/index.hbs')
      .returns({
        name: 'bar bar',
        email: 'radu.achim@iteam.se',
        layout: 'coworker'
      })

    options.hash = {
      route: './src/pages/team/',
      type: 'coworker',
      start: ''
    }

    getPages(options)

    expect(options.fn.args[0][0].data[0], 'should be first').eql({
      frontmatter: {
        name: 'bar bar',
        email: 'radu.achim@iteam.se',
        layout: 'coworker'
      },
      name: {
        first: 'bar',
        last: 'bar'
      },
      logo: 'https://www.gravatar.com',
      menutitle: '',
      subpages: null,
      title: 'bar bar',
      url: 'bar'
    })
    expect(options.fn.args[0][0].data[1], 'should be second').eql({
      frontmatter: {
        name: 'foo foo',
        email: 'rickard.laurin@iteam.se',
        layout: 'coworker'
      },
      name: {
        first: 'foo',
        last: 'foo'
      },
      logo: 'https://www.gravatar.com',
      menutitle: '',
      subpages: null,
      title: 'foo foo',
      url: 'foo'
    })
  })
})
