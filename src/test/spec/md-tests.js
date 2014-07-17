var chai       = require('chai')
,   expect     = chai.expect
,   sinon      = require('sinon');

chai.use(require('sinon-chai'));

var helper = require('../../helpers/md');

describe('#md', function () {
  it('should be a function', function () {
    expect(helper.md).to.be.a('function');
  });

  it('should add file extension if none is provided', function () {
    expect(helper.md('src/pages/case/radical-fm/text')).to.match(/^<h[0-9]*\s[a-zåäö\s0-9\\n\=\"\-\><\/\.\,\&\#\;\:\”\–]*/i);
  });

  it('should load a markdown file and return parsed text', function () {
    expect(helper.md('src/pages/case/radical-fm/text.md')).to.match(/^<h[0-9]*\s[a-zåäö\s0-9\\n\=\"\-\><\/\.\,\&\#\;\:\”\–]*/i);
  });
});