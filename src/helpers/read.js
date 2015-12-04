var fs = require('fs');

module.exports.directory = function (dir) {
  // Load all cases from folder
  var dirs = fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(dir + file).isDirectory();
  });

  return dirs;
};

module.exports.files = function (dir) {
  // Load all cases from folder
  var files = fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(dir + file).isFile();
  });

  return files;
};