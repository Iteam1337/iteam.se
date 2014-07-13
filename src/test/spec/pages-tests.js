var chai       = require('chai')
,   expect     = chai.expect
,   sinon      = require('sinon');

var helper = require('../../helpers/pages');

describe('#pages', function () {
  it('should be a function', function () {
    expect(helper.pages).to.be.a('function');
  });

  it('should add a lead character to the href', function () {
    expect(helper.pages('./src/pages/', '/')).to.be.a('string');
  });

  it('should return a list when given a route', function () {
    expect(helper.pages('./src/pages/')).to.be.a('string');
  });

  it('should return list of cases when not given a route', function () {
    expect(helper.pages()).to.be.a('string');
    expect(helper.pages()[0]).to.eql('<');
  });
});

describe('#deslugify', function () {
  it('should be a function', function () {
    expect(helper.deslugify).to.be.a('function');
  });
  
  it('should deslugify names', function () {
    expect(helper.deslugify('om-oss')).to.eql('Om oss');
    expect(helper.deslugify('vaara-tjaenster')).to.eql('Våra tjänster');
    expect(helper.deslugify('Oevrigt')).to.eql('Övrigt');
  });
});