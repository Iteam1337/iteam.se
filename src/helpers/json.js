'use strict';

module.exports.json = function (element) {
  return JSON.stringify(element, null, 2);
};
