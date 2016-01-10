'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('helper', () => {
  let options
  let employee
  let gravatar
  let front

  beforeEach(() => {
    options = {
      fn: sinon.spy()
    }

    gravatar = sinon.stub().returns('https://www.gravatar.com')

    employee = proxyquire(`${process.cwd()}/src/helpers/employee`, {
      './gravatar': gravatar
    })
  })

  describe('#employee', () => {

    it('should be a function', () => {
      expect(employee).to.be.a('function')
    })

    it('should get a picture of the employee from gravatar', () => {
      options.hash = {
        name: 'rickard',
      }

      employee(options)

      expect(gravatar).calledOnce
      expect(gravatar).calledWith('rickard.laurin@iteam.se', 400)
    })

    it('should get information for an employee', () => {
      options.hash = {
        name: 'rickard',
      }

      employee(options)

      expect(options.fn).calledOnce
    })
  })
})
