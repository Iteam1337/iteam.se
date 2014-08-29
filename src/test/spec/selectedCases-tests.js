var chai       = require('chai');
var expect     = chai.expect;
var sinon      = require('sinon');
var proxyquire = require('proxyquire');

describe.only('#selectedCases', function () {
  var options;
  var helper;
  var image;
  var front;

  beforeEach(function () {
    options = {
      fn: sinon.spy()
    };

     helper = proxyquire(process.cwd() + '/src/helpers/selectedCases', {
    });
  });

  it('should be a function', function () {
    expect(helper.selectedCases).to.be.a('function');
  });

  it("should return empty array if no cases have been added", function() {
    options.hash = {
      cases: []
    };

    helper.selectedCases(options);

    expect(options.fn).calledOnce.and.calledWith({
      data: []
    });
  });

  it("should return data", function () {
    options.hash = {
      cases: ['Vimla']
    };

    helper.selectedCases(options);

    expect(options.fn).calledOnce;
  });
});