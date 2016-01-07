'use strict'

var chai = require('chai')
var expect = chai.expect
var sinon = require('sinon')
var proxyquire = require('proxyquire')

chai.use(require('sinon-chai'))

describe('md', function () {
  var md
  var fs
  var marked
  var path
  var options

  beforeEach(function () {
    options = {
      data: {
        orig: {
          files:[{
            src: '/users/foo/index'
          }]
        }
      }
    }

    marked = sinon.stub().returns('lorem ipsum dolor sit amet')

    fs = {
      readFileSync: sinon.spy()
    }

    path = {}

    md = proxyquire(process.cwd() + '/src/helpers/md', {
      'marked': marked,
      'fs': fs,
      'path': path
    })
  })

  describe('#md', function () {
    it('reads the file if the filePath is specified', function () {
      md('/users/foo/test', options)
      expect(fs.readFileSync).calledOnce
      expect(fs.readFileSync).calledWith('/users/foo/test.md', 'utf8')
    })
    it('reads the file from the src specified in options', function () {
      md('bar', options)
      expect(fs.readFileSync).calledOnce
      expect(fs.readFileSync).calledWith('/users/foo/bar.md', 'utf8')
    })
    it('returns a parsed text', function () {
      var result = md('bar', options)
      expect(result).to.equal('lorem ipsum dolor sit amet')
    })
  })
})
