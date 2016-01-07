var fs = require('fs');

module.exports = function directory(dir) {
  // Load all cases from folder
  var dirs = fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(dir + file).isDirectory();
  });

  return dirs;
};
