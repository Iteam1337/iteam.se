var chai       = require('chai')
,   expect     = chai.expect
,   sinon      = require('sinon');

var helper = require('../../helpers/math');

describe('#math', function () {
  it('should be a function', function () {
    expect(helper.math).to.be.a('function');
  });

  it('should return correct answer for addition', function () {
    expect(helper.math(1, '+', 2)).to.eql(3);
  });

  it('should return correct answer for subtraction', function () {
    expect(helper.math(2, '-', 1)).to.eql(1);
  });

  it('should return correct answer for multiplication', function () {
    expect(helper.math(2, '*', 2)).to.eql(4);
  });

  it('should return correct answer for division', function () {
    expect(helper.math(9, '/', 3)).to.eql(3);
  });

  it('should return correct answer for remainder', function () {
    expect(helper.math(1.5, '%', 1)).to.eql(0.5);
  });
});