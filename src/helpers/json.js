'use strict';

module.exports.json = function (element, options) {
  console.log(element);
  return options.fn(JSON.stringify(element, null, 2));
};
