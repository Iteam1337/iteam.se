var chai       = require('chai')
,   expect     = chai.expect
,   sinon      = require('sinon')
,   proxyquire = require('proxyquire');

describe('#pages', function () {
  var image;
  var helper;

  beforeEach(function () {
    image = {
      gravatar: sinon.stub().returns('http://www.gravatar.com')
    };

    helper = proxyquire(process.cwd() + '/src/helpers/pages', {
      './gravatar': image
    });
  });

  it('should be a function', function () {
    expect(helper.pages).to.be.a('function');
  });

  it('should add a lead character to the href', function () {
    expect(helper.pages('./src/pages/', '/')).to.be.a('string');
    expect(helper.pages('./src/pages/', '/')).to.match(/^<li><a\shref="\/.+?<\/li>$/);
  });

  it('should return a list when given a route', function () {
    expect(helper.pages('./src/pages/')).to.be.a('string');
    expect(helper.pages('./src/pages/')).to.match(/^<li><a\shref=".+?<\/li>$/);
  });

  it('should return list of cases when not given a route', function () {
    expect(helper.pages()).to.be.a('string');
    expect(helper.pages()).to.match(/^<li><a.+?<\/li>$/);
  });

  it('should get the gravatars if it is a coworker', function () {
    helper.pages('./src/pages/medarbetare/','','coworker');
    expect(image.gravatar).called.and.calledWith('rickard.laurin@iteam.se', false);
  });

  it('should return a different template if type is coworker', function () {
    expect(helper.pages('./src/pages/medarbetare/','','coworker')).to.match(/^<li><a.+?<\/li>$/);
  });

  it('should return a different template if type is services', function () {
    expect(helper.pages('./src/pages/medarbetare/','','services')).to.match(/^<li><i.+?<\/li>$/);
  });

  it('should sort by last name', function () {
    expect(helper.pages('./src/pages/medarbetare/','','coworker')).to.match(/^<li><a href="radu">.+?<\/li>$/);
  });
});