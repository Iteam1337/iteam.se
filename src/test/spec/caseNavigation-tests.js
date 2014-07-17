var chai       = require('chai')
,   expect     = chai.expect
,   sinon      = require('sinon');

var helper = require('../../helpers/caseNavigation');

describe('#caseNavigation', function () {
  it('should be a function', function () {
    expect(helper.caseNavigation).to.be.a('function');
  });

  it('should return if no project was found with order', function () {
    expect(helper.caseNavigation(1)).to.be.false;
  });

  it('should find the case with the order number previous itself', function () {
    expect(helper.caseNavigation(2)).to.match(/^<a.+?<\/a>$/i);
  });

  it('should find the case with the order number after itself', function () {
    expect(helper.caseNavigation(1, 'next')).to.match(/^<a.+?<\/a>$/i);
  });
});