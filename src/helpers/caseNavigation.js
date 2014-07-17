var fs = require('fs');
var front = require('yaml-front-matter');

module.exports.caseNavigation = function (order, direction) {
  order += (direction === 'next') ? 1 : -1;

  var leftIcon = (direction !== 'next') ? '<i class="ion-chevron-left"></i>' : '';
  var rightIcon = (direction === 'next') ? '<i class="ion-chevron-right"></i>' : '';

  // Load all cases from folder
  var dir = './src/pages/case/';
  var dirs = fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(dir + file).isDirectory();
  });

  // Filter cases that match either previous or next depending on direction
  var cases = dirs.filter(function (folder) {
    var frontmatter;

    frontmatter = front.loadFront(dir + folder + '/index.hbs');

    return frontmatter.order === order;
  });

  // If no case was found return
  if (!cases[0]) { return false; }

  // Return link to case
  var project = front.loadFront(dir + cases[0] + '/index.hbs');

  return leftIcon + '<a href="/case/' + cases[0] + '">' + project.subtitle + '</a>' + rightIcon;
}; 