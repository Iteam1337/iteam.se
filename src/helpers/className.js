'use strict';

module.exports = function className(name) {
  return name.replace(/[^\w\d]/g, '').replace(/^(\d){1,}/, '');
};
