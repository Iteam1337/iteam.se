var chai   = require('chai')
,   expect = chai.expect
,   crypto = require('crypto')
,   sinon  = require('sinon');

var helper = require('../../helpers/gravatar');

describe('#gravatar', function () {
  var email, hash;

  it('should be a function', function () {
    expect(helper.gravatar).to.be.a('function');
  });

  beforeEach(function () {
    email = 'rln@iteam.se';
    hash = crypto.createHash('md5').update(email).digest('hex');    
  });

  it('should return a url', function () {
    expect(helper.gravatar(email)).to.eql('http://www.gravatar.com/avatar/' + hash + '.jpg');
  });

  it('should return a url with a size if size is provided', function () {
    expect(helper.gravatar(email,200)).to.eql('http://www.gravatar.com/avatar/' + hash + '.jpg?s=200');
  });
});