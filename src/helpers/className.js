'use strict';

module.exports.className = function () {
  return this.replace(/[^\w\d]/g, '').replace(/^(\d){1,}/, '');
};