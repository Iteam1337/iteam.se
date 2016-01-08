'use strict'

const chai = require('chai')
const expect = chai.expect
const crypto = require('crypto')
const sinon = require('sinon')
const gravatar = require('../../helpers/gravatar')

describe('#gravatar', () => {
  let email
  let hash

  it('should be a function', () => {
    expect(gravatar).to.be.a('function')
  })

  beforeEach(() => {
    email = 'rln@iteam.se'
    hash = crypto.createHash('md5').update(email).digest('hex')
  })

  it('should return a url', () => {
    expect(gravatar(email))
      .to
      .eql(`https://www.gravatar.com/avatar/${hash}.jpg`)
  })

  it('should return a url with a size if size is provided', () => {
    expect(gravatar(email, 200))
      .to
      .eql(`https://www.gravatar.com/avatar/${hash}.jpg?s=200`)
  })
})
