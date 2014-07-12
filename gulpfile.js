var gulp      = require('gulp')
,   less      = require('gulp-less')
,   plumber   = require('gulp-plumber')
,   webserver = require('gulp-webserver')
,   rename    = require('gulp-rename')
,   assemble  = require('gulp-assemble')
,   htmlmin   = require('gulp-htmlmin')
,   rimraf    = require('gulp-rimraf');

gulp.task('clean', function (cb) {
  return gulp.src('./out/**/*', { read: false })
    .pipe(rimraf(cb));
});

var config = {
  styles: 'src/less/**/',
  stylesOut: 'out/css/',
  allStyle: '*.less',
  mainStyle: 'main.less',
  pages: 'src/pages/**/*.hbs'
};

gulp.task('connect', function () {
  gulp.src('out')
    .pipe(webserver({
      livereload: true
    }));
});

gulp.task('copy', function () {
  gulp.src([ 'src/content/fonts/*', 'bower_components/ionicons/fonts/*' ])
    .pipe(gulp.dest('out/fonts'));

  gulp.src('src/scripts/**/*')
    .pipe(gulp.dest('out/scripts'));
});

gulp.task('less', function () {
  gulp.src(config.styles + config.mainStyle)
    .pipe(plumber())
    .pipe(less({
      compress: true
    }))
    .pipe(rename('iteam.css'))
    .pipe(gulp.dest(config.stylesOut));
});

var options = {
  partials: 'src/partials/*.hbs',
  layoutdir: 'src/layouts/',
  helpers: [
    'src/scripts/handlebar-helpers.js',
    'node_modules/handlebars-helper-partial/index.js'
  ]
};

gulp.task('assemble', function () {
  gulp.src([config.pages])
    .pipe(assemble(options))
    .pipe(htmlmin({
      collapseWhitespace:true
    }))
    .pipe(gulp.dest('./out'));
});

gulp.task('watch', function () {
  gulp.watch(['src/layouts/**/*', config.pages, 'src/partials/**/*.hbs'], ['assemble']);
  gulp.watch([config.styles + config.allStyle], ['less']);
  gulp.watch('src/content/**/*', ['copy']);
  gulp.watch('src/scripts/**/*', ['copy']);
});

gulp.task('default', ['copy', 'less', 'assemble', 'connect', 'watch']);