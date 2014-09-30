var chai   = require('chai')
,   expect = chai.expect
,   crypto = require('crypto')
,   sinon  = require('sinon');

var helper = require('../../helpers/slugify');

describe('#slugify', function () {
  it('should be a function', function () {
    expect(helper.slugify).to.be.a('function');
  });

  it("should return the strings in lowercase", function() {
    expect(helper.slugify('HEJ')).to.eql('hej');
  });

  it("should remove any unwanted characters", function() {
    expect(helper.slugify('håla')).to.eql('haala');
    expect(helper.slugify('hälla')).to.eql('haella');
    expect(helper.slugify('höra')).to.eql('hoera');
  });

  it("should replace spaces with hyphens", function() {
    expect(helper.slugify('hej och hå')).to.eql('hej-och-haa');
  });

  it("should replace ampersands with och", function() {
    expect(helper.slugify('drift & support')).to.eql('drift-och-support');
  });
});