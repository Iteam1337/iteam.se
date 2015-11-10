'use strict';

module.exports.json = function (element, options) {
  return options.fn(JSON.stringify(element, null, 2));
};
