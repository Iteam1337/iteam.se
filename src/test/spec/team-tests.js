'use strict'

const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const proxyquire = require('proxyquire')

chai.use(require('sinon-chai'))

describe('#team', () => {
  let gravatar
  let team
  let options
  let front

  beforeEach(() => {
    options = {
      fn: sinon.spy()
    }

    gravatar = sinon.stub().returns('http://www.gravatar.com')

    front = {
      loadFront: sinon.stub()
    }

    team = proxyquire(`${process.cwd()}/src/helpers/team`, {
      './gravatar': gravatar,
      'yaml-front-matter': front
    })
  })

  it('should call for a gravatar', () => {
    front.loadFront.returns({
      email: 'rickard.laurin@iteam.se'
    })

    team({
      team: ['rickard']
    }, options)

    expect(gravatar)
      .calledOnce
      .and
      .calledWith('rickard.laurin@iteam.se', false)
  })

  it('should call options.fn with the correct parameter', () => {
    front
      .loadFront
      .withArgs('./src/pages/team/rickard/index.hbs')
      .returns({
        email: 'rickard.laurin@iteam.se'
      })

    front
      .loadFront
      .withArgs('./src/pages/team/dennis/index.hbs')
      .returns({
        email: 'dennis.pettersson@iteam.se'
      })

    team({
      team: ['rickard', 'dennis'],
      'gravatar-sizes': 200
    }, options)

    expect(options.fn).calledOnce

    expect(options.fn.args[0][0].data[0])
      .eql({
        frontmatter: {
          email: 'rickard.laurin@iteam.se'
        },
        logo: 'http://www.gravatar.com',
        url: '/team/rickard',
        size: 200,
        name: {
          first: '',
          last: ''
        }
      })

     expect(options.fn.args[0][0].data[1])
      .eql({
        frontmatter: {
          email: 'dennis.pettersson@iteam.se'
        },
        logo: 'http://www.gravatar.com',
        url: '/team/dennis',
        size: 200,
        name: {
          first: '',
          last: ''
        }
      })
  })
})
