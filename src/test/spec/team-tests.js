var chai       = require('chai')
,   expect     = chai.expect
,   sinon      = require('sinon');

var helper = require('../../helpers/team');

describe('#team', function () {
  it('should be a function', function () {
    expect(helper.team).to.be.a('function');
  });

  it('should return coworkers name', function () {
    expect(helper.team(['rickard'])).to.eql('<li><img src="http://www.gravatar.com/avatar/08053b9b0035a1ad64dc9be5485f2cf5.jpg">Rickard Laurin</li>');
  });

  it('should add a size to the gravatars', function () {
    expect(helper.team(['rickard'], 200)).to.eql('<li><img src="http://www.gravatar.com/avatar/08053b9b0035a1ad64dc9be5485f2cf5.jpg?s=200">Rickard Laurin</li>');
    
  });
});