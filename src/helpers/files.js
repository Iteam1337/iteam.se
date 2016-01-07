// this is used in ./cagetories.js
var fs = require('fs');

module.exports = function files(dir) {
  // Load all cases from folder
  return fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(dir + file).isFile();
  });
};
