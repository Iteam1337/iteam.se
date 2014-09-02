'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var jsdom = require('jsdom');

chai.use(require('sinon-chai'));

describe('filters', function () {
  var filters; 
  var window;
  var document;
  var html;

  beforeEach(function () {

      html = '<html>' + 
        '<head></head>' +
        '<body>' + 
          '<ul class="filters-list">' + 
            '<li data-category="foo1" class="less-used-filter hidden"></li>' +
            '<li data-category="foo2"></li>' + 
            '<li data-category="foo3" class="less-used-filter hidden"></li>' + 
            '<li data-category="foo4"></li>' + 
            '<li id="toggle-all"></li>' +
          '</ul>' + 
        '</body>' + 
        '</html>';

      window = jsdom.jsdom(html).createWindow();
      document = window.document;
      global.window = window;
      global.document = document;
      filters = proxyquire(process.cwd() + '/src/scripts/categories', {});
  });
 
  xdescribe('#toggleFilters', function () {
    it('should show all fiters if they are hidden', function () {
      var clickEvent = window.document.createEvent('click');
      clickEvent.initEvent('click', true, true);
      var element = window.document.getElementById('toggle-all');
      element.dispatchEvent(clickEvent);
      var categories = document.querySelectorAll('.hidden');
      expect(categories.length).to.equal(0);
    });
    it('should hide all fiters if they are visible', function () {
      var clickEvent = window.document.createEvent('click');
      clickEvent.initEvent('click', true, true);
      var element = window.document.getElementById('toggle-all');
      element.dispatchEvent(clickEvent);
      element.dispatchEvent(clickEvent);
      var categories = document.querySelectorAll('.hidden');
      expect(categories.length).to.equal(2);
    });
  });
});