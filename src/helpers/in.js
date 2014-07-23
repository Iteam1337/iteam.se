module.exports.in = function (array, key, value, options) {
  if (typeof key !== 'string' || typeof value !== 'string') {
    return;
  }
  if (Array.isArray(array) === false) {
    return;
  }

  var returnValue = array.reduce(function (previousValue, currentValue) {
    var current = currentValue[key];
    if (current === value) {
      return currentValue;
    }
    return previousValue;
  }, null);

  if (returnValue === null) {
    return;
  }

  return options.fn(returnValue);
};