'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const proxyquire = require('proxyquire')

describe('#selectedCases', () => {
  let options
  let selectedCases
  let image
  let front

  beforeEach(() => {
    options = {
      fn: sinon.spy()
    }

    selectedCases = proxyquire(`${process.cwd()}/src/helpers/selectedCases`, {})
  })

  it('should be a function', () => {
    expect(selectedCases).to.be.a('function')
  });

  it('should return empty array if no cases have been added', () => {
    options.hash = {
      cases: []
    }

    selectedCases(options)

    expect(options.fn).calledOnce.and.calledWith({
      data: []
    })
  })

  it('should return data', () => {
    options.hash = {
      cases: ['Vimla']
    }

    selectedCases(options)

    expect(options.fn).calledOnce
  })
})
