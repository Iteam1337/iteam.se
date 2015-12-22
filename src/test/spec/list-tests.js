var chai       = require('chai')
,   expect     = chai.expect
,   sinon      = require('sinon');

var helper = require('../../helpers/list');

describe('#list', function () {
  it('should be a function', function () {
    expect(helper.list).to.be.a('function');
  });

  it('should return two lists', function () {
    var items = [
      'ett',
      'två',
      'tre'
    ];

    expect(helper.list(items)).to.be.a('string');
    expect(helper.list(items)).to.eql('<ul class="list__list"><li>ett</li><li>två</li></ul><ul class="list__list"><li>tre</li></ul>');
  });
});