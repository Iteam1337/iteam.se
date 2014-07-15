var chai       = require('chai')
,   expect     = chai.expect
,   sinon      = require('sinon');

var helper = require('../../helpers/gravatar');

describe('#gravatar', function () {
  it('should be a function', function () {
    expect(helper.gravatar).to.be.a('function');
  });
});