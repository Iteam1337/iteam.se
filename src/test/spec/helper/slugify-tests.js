'use strict'

const chai = require('chai')
const expect = chai.expect
const crypto = require('crypto')
const sinon = require('sinon')
const slugify = require(`${process.cwd()}/src/helpers/slugify`)

describe('helper', () => {
  describe('#slugify', () => {
    it('should be a function', () => {
      expect(slugify).to.be.a('function')
    })

    it('should return the strings in lowercase', () => {
      expect(slugify('HEJ')).to.eql('hej')
    })

    it('should remove any unwanted characters', () => {
      expect(slugify('håla')).to.eql('haala')
      expect(slugify('hälla')).to.eql('haella')
      expect(slugify('höra')).to.eql('hoera')
    })

    it('should replace spaces with hyphens', () => {
      expect(slugify('hej och hå')).to.eql('hej-och-haa')
    })

    it('should replace ampersands with och', () => {
      expect(slugify('drift & support')).to.eql('drift-och-support')
    })
  })
})
