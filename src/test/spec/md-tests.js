'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const proxyquire = require('proxyquire')

chai.use(require('sinon-chai'))

describe('md', () => {
  let md
  let fs
  let marked
  let path
  let options

  beforeEach(() => {
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

  describe('#md', () => {
    it('reads the file if the filePath is specified', () => {
      md('/users/foo/test', options)
      expect(fs.readFileSync).calledOnce
      expect(fs.readFileSync).calledWith('/users/foo/test.md', 'utf8')
    })
    it('reads the file from the src specified in options', () => {
      md('bar', options)
      expect(fs.readFileSync).calledOnce
      expect(fs.readFileSync).calledWith('/users/foo/bar.md', 'utf8')
    })
    it('returns a parsed text', () => {
      const result = md('bar', options)
      expect(result).to.equal('lorem ipsum dolor sit amet')
    })
  })
})
