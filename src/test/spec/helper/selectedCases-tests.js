'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('helper', () => {
  let options
  let selectedCases
  let image
  let front

  beforeEach(() => {
    options = {
      fn: sinon.spy()
    }

    front = {
      loadFront: sinon.stub()
    }

    selectedCases = proxyquire(`${process.cwd()}/src/helpers/selectedCases`, {
      'yaml-front-matter': front
    })
  })
  describe('#selectedCases', () => {
    it('should be a function', () => {
      expect(selectedCases).to.be.a('function')
    });

    it('should return empty array if no cases have been added', () => {
      options.hash = {
        cases: []
      }

      selectedCases(options)

      expect(options.fn).calledOnce.and.calledWith({
        data: [],
        count: 0
      })
    })

    it('should return data', () => {
      front
        .loadFront
        .returns({
          foo: 'bar'
        })

      options.hash = {
        cases: ['Vimla']
      }

      selectedCases(options)

      expect(options.fn).calledOnce
      expect(front.loadFront)
        .calledOnce
        .calledWith('./src/pages/case/Vimla/index.hbs')

      expect(options.fn).calledWith({
        count: 1,
        data: [{
          classes: '',
          foo: 'bar',
          url: '/case/vimla'
        }]
      })
    })

    it('should add a default component to data', () => {
      front
        .loadFront
        .returns({
          foo: 'bar'
        })

      options.hash = {
        cases: ['Vimla'],
        default: {
          foo: 'bar',
          url: 'foo/bar'
        }
      }

      selectedCases(options)

      expect(options.fn)
        .calledOnce
        .calledWith({
          count: 2,
          data: [{
            foo: 'bar',
            url: 'foo/bar'
          }, {
            classes: '',
            foo: 'bar',
            url: '/case/vimla'
          }]
        })
    })
  })
})
