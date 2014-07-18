var chai       = require('chai')
,   expect     = chai.expect
,   sinon      = require('sinon');

chai.use(require('sinon-chai'));

var helper = require('../../helpers/map');

describe('#map', function () {
  it('should be a function', function () {
    expect(helper.map).to.be.a('function');
  });

  it('should return an image with URL', function () {
    expect(helper.map()).to.match(/^<img.+?">$/);
  });
});