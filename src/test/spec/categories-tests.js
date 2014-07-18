var chai       = require('chai')
,   expect     = chai.expect
,   sinon      = require('sinon');

var helper = require('../../helpers/categories');

describe('#categories', function () {
  it('should be a function', function () {
    expect(helper.categories).to.be.a('function');
  });

  it('should return an array with all categories', function () {
    expect(helper.categories()).to.be.an('array').and.include('systemutveckling').and.include('musik');
  });
});