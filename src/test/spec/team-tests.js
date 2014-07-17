var chai       = require('chai')
,   expect     = chai.expect
,   sinon      = require('sinon')
,   proxyquire = require('proxyquire');

chai.use(require('sinon-chai'));

describe('#team', function () {
  var image;
  var helper;

  beforeEach(function () {
    image = {
      gravatar: sinon.stub().returns('http://www.gravatar.com')
    };

    helper = proxyquire(process.cwd() + '/src/helpers/team', {
      './gravatar': image
    });
  });

  it('should be a function', function () {
    expect(helper.team).to.be.a('function');
  });

  it('should return a list template', function () {
    expect(helper.team(['rickard'])).to.match(/<li><img.+?<\/li>/);
  });

  it('should not matter if name is capitalized', function () {
    expect(helper.team(['Rickard'])).to.match(/<li><img.+?<\/li>/);
  });

  it('should call for a gravatar', function () {
    helper.team(['rickard']);

    expect(image.gravatar).calledOnce.and.calledWith('rickard.laurin@iteam.se', false);
  });
});