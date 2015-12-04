'use strict';

module.exports.className = function (className) {
  return className.replace(/[^\w\d]/g, '').replace(/^(\d){1,}/, '');
};