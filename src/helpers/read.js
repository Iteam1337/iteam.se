var fs = require('fs');

module.exports.directory = function (dir) {
  // Load all cases from folder
  var dirs = fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(dir + file).isDirectory();
  });

  return dirs;
};