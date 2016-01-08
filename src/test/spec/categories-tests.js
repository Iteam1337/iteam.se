'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const proxyquire = require('proxyquire')

chai.use(require('sinon-chai'))

describe('categories', () => {
  const categories = proxyquire(`${process.cwd()}/src/helpers/categories`, {})
  let options
  let filters

  beforeEach(() => {
    filters = [
      'systemutveckling',
      'musik'
    ]
    options = {
      fn: sinon.stub().returns(filters)
    }
  })

  describe('#categories', () => {
    it('should be a function', () => {
      expect(categories).to.be.a('function')
    })

    it('should return an array with all categories', () => {
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
