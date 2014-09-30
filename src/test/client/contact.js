'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var jsdom = require('jsdom');

chai.use(require('sinon-chai'));

describe('contact', function () {
  var window;
  var document;
  var html;
  var contact;
  var xhr;

  beforeEach(function () {
    html = '<html>' + 
      '<head></head>' +
      '<body>' + 
        '<form id="form-contact">' + 
          '<input type="text" name="name" value="Radu">' +
          '<input type="text" name="email" value="ram">' + 
          '<textarea name="text" required="required">Hej</textarea>' + 
          '<input type="submit" value="Send">' + 
        '</form>' + 
      '</body>' + 
      '</html>';

    xhr = {
      open: sinon.spy(),
      setRequestHeader: sinon.spy(),
      onload: sinon.spy(),
      send: sinon.spy()
    };
    window = jsdom.jsdom(html).createWindow();
    document = window.document;
    window.XMLHttpRequest = sinon.stub().returns(xhr);
    global.window = window;
    global.document = document;
    contact = proxyquire(process.cwd() + '/src/scripts/contact', {});
  });

  xdescribe('#submit', function () {
    it('sends the data and sets the text input to empty string', function () {
      var submitEvent = document.createEvent('submit');
      submitEvent.initEvent('submit', true, true);
      var element = document.getElementsByTagName('form')[0];
      element.dispatchEvent(submitEvent);
      expect(xhr.send).calledOnce
        .calledWith('{"username":"Radu <ram>","text":"Hej","icon_emoji":":ghost:"}');
      xhr.onload();
      var textElement = document.querySelector('textarea');
      expect(textElement.value).to.equal('');

    });
  });
});