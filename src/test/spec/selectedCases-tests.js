var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var proxyquire = require('proxyquire')

describe('#selectedCases', function () {
  var options
  var selectedCases
  var image
  var front

  beforeEach(function () {
    options = {
      fn: sinon.spy()
    }

    selectedCases = proxyquire(process.cwd() + '/src/helpers/selectedCases', {})
  })

  it('should be a function', function () {
    expect(selectedCases).to.be.a('function')
  });

  it('should return empty array if no cases have been added', function() {
    options.hash = {
      cases: []
    }

    selectedCases(options)

    expect(options.fn).calledOnce.and.calledWith({
      data: []
    })
  })

  it('should return data', function () {
    options.hash = {
      cases: ['Vimla']
    }

    selectedCases(options)

    expect(options.fn).calledOnce
  })
})
