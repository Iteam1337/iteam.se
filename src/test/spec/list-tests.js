'use strict'

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')

var list = require('../../helpers/list')

describe('#list', function () {
  it('should be a function', function () {
    expect(list).to.be.a('function')
  })

  it('should return two lists', function () {
    var items = [
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
