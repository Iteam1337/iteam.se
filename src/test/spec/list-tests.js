'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')

const list = require('../../helpers/list')

describe('#list', () => {
  it('should be a function', () => {
    expect(list).to.be.a('function')
  })

  it('should return two lists', () => {
    const items = [
      'ett',
      'två',
      'tre'
    ]

    expect(list(items)).to.be.a('string')
    expect(list(items))
      .to
      .eql('<ul class="list__list"><li>ett</li><li>två</li></ul><ul class="list__list"><li>tre</li></ul>')

  })
})
