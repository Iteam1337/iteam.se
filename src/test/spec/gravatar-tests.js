'use strict'

var chai = require('chai')
var expect = chai.expect
var crypto = require('crypto')
var sinon = require('sinon')

var gravatar = require('../../helpers/gravatar')

describe('#gravatar', function () {
  var email
  var hash

  it('should be a function', function () {
    expect(gravatar).to.be.a('function')
  })

  beforeEach(function () {
    email = 'rln@iteam.se'
    hash = crypto.createHash('md5').update(email).digest('hex')
  })

  it('should return a url', function () {
    expect(gravatar(email))
      .to
      .eql('https://www.gravatar.com/avatar/' + hash + '.jpg')
  })

  it('should return a url with a size if size is provided', function () {
    expect(gravatar(email, 200))
      .to
      .eql('https://www.gravatar.com/avatar/' + hash + '.jpg?s=200')
  })
})
