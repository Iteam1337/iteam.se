'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    assemble: {
      options: {
        data: 'src/data/*.json',
        layout: 'default.hbs',
        layoutdir: 'src/layouts/',
        partials: 'src/partials/**/*.hbs',
        helpers: [
          'handlebars-helper-partial'
        ]
      },
      site: {
        src: ['src/pages/**/*.hbs'],
        dest: 'out'
      }            
    },
  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('default', ['assemble']);
};
