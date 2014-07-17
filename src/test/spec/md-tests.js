var chai       = require('chai')
,   expect     = chai.expect
,   sinon      = require('sinon');

chai.use(require('sinon-chai'));

var helper = require('../../helpers/md');

describe.only('#md', function () {
  it('should be a function', function () {
    expect(helper.md).to.be.a('function');
  });

  it('should load a markdown file and return parsed text', function () {
    expect(helper.md('src/pages/case/radical-fm/text.md')).to.match(/^<h3\s[a-zåäö\s0-9\\n\=\"\-\>\<\/\.\,\&\#\;\:\”\–]*/i);
  });
});