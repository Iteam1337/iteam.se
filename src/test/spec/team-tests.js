'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

chai.use(require('sinon-chai'));

describe('#team', function () {
  var image;
  var helper;
  var options;
  var front;

  beforeEach(function () {
    options = {
      fn: sinon.spy()
    };

    image = {
      gravatar: sinon.stub().returns('http://www.gravatar.com')
    };

    front = {
      loadFront: sinon.stub()
    };

    helper = proxyquire(process.cwd() + '/src/helpers/team', {
      './gravatar': image,
      'yaml-front-matter': front
    });
  });
  it('should call for a gravatar', function () {
    front.loadFront.returns({ email: 'rickard.laurin@iteam.se' });
    helper.team({ team: ['rickard'] }, options);
    expect(image.gravatar).calledOnce.and.calledWith('rickard.laurin@iteam.se', false);
  });
  it('should call options.fn with the correct parameter', function () {
    front.loadFront.withArgs('./src/pages/coworkers/rickard/index.hbs').returns({ email: 'rickard.laurin@iteam.se' });
    front.loadFront.withArgs('./src/pages/coworkers/dennis/index.hbs').returns({ email: 'dennis.pettersson@iteam.se' });
    helper.team({ team: ['rickard', 'dennis'], 'gravatar-sizes': 200 }, options);
    expect(options.fn).calledOnce;

    expect(options.fn.args[0][0].data[0])
      .eql({
        frontmatter: { email: 'rickard.laurin@iteam.se' },
        logo: 'http://www.gravatar.com',
        url: '/coworkers/rickard',
        size: 200,
        name: {
          first: '',
          last: ''
        }
      });

     expect(options.fn.args[0][0].data[1])
      .eql({
        frontmatter: { email: 'dennis.pettersson@iteam.se' },
        logo: 'http://www.gravatar.com',
        url: '/coworkers/dennis',
        size: 200,
        name: {
          first: '',
          last: ''
        }
      });
  });
});
