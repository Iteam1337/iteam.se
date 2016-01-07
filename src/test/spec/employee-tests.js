'use strict'

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var proxyquire = require('proxyquire')

describe('#employee', function () {
  var options
  var employee
  var image
  var front

  beforeEach(function () {
    options = {
      fn: sinon.spy()
    }

    image = {
      gravatar: sinon.stub().returns('https://www.gravatar.com')
    }

    employee = proxyquire(process.cwd() + '/src/helpers/employee', {
      './gravatar': image
    })
  })

  it('should be a function', function () {
    expect(employee).to.be.a('function')
  })

  it('should get a picture of the employee from gravatar', function () {
    options.hash = {
      name: 'rickard',
    }

    employee(options)

    expect(image.gravatar).calledOnce
    expect(image.gravatar).calledWith('rickard.laurin@iteam.se', 400)
  })

  it('should get information for an employee', function () {
    options.hash = {
      name: 'rickard',
    }

    employee(options)

    expect(options.fn).calledOnce
  })
})
