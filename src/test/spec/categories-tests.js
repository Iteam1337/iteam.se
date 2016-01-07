'use strict'

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var proxyquire = require('proxyquire')

chai.use(require('sinon-chai'))

describe('categories', function () {
  var categories = proxyquire(process.cwd() + '/src/helpers/categories', {})
  var options
  var filters

  beforeEach(function () {
    filters = ['systemutveckling', 'musik']
    options = {
      fn: sinon.stub().returns(filters)
    }
  })

  describe('#categories', function () {
    it('should be a function', function () {
      expect(categories).to.be.a('function')
    })

    it('should return an array with all categories', function () {
      expect(categories(null, options))
        .to
        .be
        .an('array')
        .and
        .include('systemutveckling')
        .and
        .include('musik')
    })
  })
})
