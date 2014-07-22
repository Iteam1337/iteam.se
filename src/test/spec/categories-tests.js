'use strict';
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');

chai.use(require('sinon-chai'));

describe('categories', function () {
  var helper;
  var options;
  var filters;

  beforeEach(function () {
    filters = ['systemutveckling', 'musik'];
    options = {
      fn: sinon.stub().returns(filters)
    };
    helper = proxyquire(process.cwd() + '/src/helpers/categories', {});
  });

  describe('#categories', function () {
    it('should be a function', function () {
      expect(helper.categories).to.be.a('function');
    });

    it('should return an array with all categories', function () {
      expect(helper.categories(null, options)).to.be.an('array').and.include('systemutveckling').and.include('musik');
    });
  });
});