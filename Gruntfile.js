'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    assemble: {
      options: {
        data: 'src/data/*.json',
        layout: 'default.hbs',
        layoutdir: 'src/layouts',
        partials: 'src/partials/*.hbs',
        helpers: [
          'handlebars-helper-partial'
        ]
      },
      cases: {
        options: { layout: 'case.hbs' },
        files : {
          'out/' : ['./src/pages/case/**/*.hbs']
        },
      }            
    },
  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('default', ['assemble']);
};
