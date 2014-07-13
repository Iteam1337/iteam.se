var fs = require('fs');

module.exports.pages = function (route, start, options) {
  var dir = route || './src/pages/case/';
  var lead = start || '';

  var dirs = fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(dir + file).isDirectory();
  });

  var cases = dirs.map(function (folder) {
    var name = module.exports.deslugify(folder);
    var listUrl = '<li>'+
                    '<a href="' + lead + folder + '/">' + name + '</a>'+
                  '</li>';

    return listUrl;
  });

  return cases.join().replace(/\,/g,'');
};

module.exports.deslugify = function (slug) {
  var deslugged = slug
    .toLowerCase()
    .replace(/aa/ig, 'å')
    .replace(/ae/ig, 'ä')
    .replace(/oe/ig, 'ö')
    .replace(/\-/g, ' ');
    
  return deslugged.charAt(0).toUpperCase() + deslugged.slice(1);
};