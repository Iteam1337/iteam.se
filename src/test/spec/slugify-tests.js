'use strict'

var chai = require('chai')
var expect = chai.expect
var crypto = require('crypto')
var sinon = require('sinon')

var slugify = require('../../helpers/slugify')

describe('#slugify', function () {
  it('should be a function', function () {
    expect(slugify).to.be.a('function')
  })

  it('should return the strings in lowercase', function() {
    expect(slugify('HEJ')).to.eql('hej')
  })

  it('should remove any unwanted characters', function() {
    expect(slugify('håla')).to.eql('haala')
    expect(slugify('hälla')).to.eql('haella')
    expect(slugify('höra')).to.eql('hoera')
  })

  it('should replace spaces with hyphens', function() {
    expect(slugify('hej och hå')).to.eql('hej-och-haa')
  })

  it('should replace ampersands with och', function() {
    expect(slugify('drift & support')).to.eql('drift-och-support')
  })
})
