'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var runSequence = require('run-sequence');
var rimraf = require('rimraf');
var path = require('path');

var options = {
  partials: 'src/partials/*.hbs',
  layoutdir: 'src/layouts/',
  helpers: [
    'src/helpers/*.js'
  ]
};

var sassOptions = {
  outputStyle: 'compressed'
};

var config = {
  stylesOut: 'out/css/',
  pages: [
    './src/pages/**/index.hbs'
  ]
};

gulp.task('clean', function () {
  rimraf.sync('./out');
});

gulp.task('jshint', function () {
  gulp.src(['src/helpers/**/*.js', 'src/test/**/*.js', 'src/scripts/**/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function () {
  gulp.src([
    './src/scripts/social/Social.js',
    './src/scripts/social/*.js',
    './src/scripts/**/*.js',
    './bower_components/wowjs/dist/wow.min.js'
  ])
    .pipe($.concat('all.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('./out/scripts'));
});


gulp.task('test', function (done) {
  gulp
    .src(['src/test/**/*.js'], { read: false })
    .pipe($.plumber())
    .pipe($.mocha())
    .on('end', done);
});

gulp.task('connect', function () {
  gulp.src('./out/')
    .pipe($.webserver({
      host: process.env.host || 'localhost',
      livereload: true,
      port: 9000
    }));
});

gulp.task('copy', function () {
  gulp.src(['bower_components/ionicons/fonts/*'])
    .pipe(gulp.dest('out/content/fonts'));

  gulp.src(['src/content/**/*'])
    .pipe(gulp.dest('out/content'));
});

gulp.task('test', function (done) {
  gulp
    .src(['src/test/**/*.js'], { read: false })
    .pipe($.plumber())
    .pipe($.mocha())
    .on('end', done);
});

gulp.task('sass-ie', function () {
  gulp.src('./src/scss/ie.scss')
    .pipe($.plumber())
    .pipe($.sass(sassOptions))
    .pipe($.autoprefixer({
      browsers: ['ie 7', 'ie 8', 'ie 9'],
      cascade: false
    }))
    .pipe($.concat('ie.css'))
    // .pipe($.cssnano())
    .pipe(gulp.dest(config.stylesOut));
  gulp.src('./src/scss/ie-lt8.scss')
    .pipe($.plumber())
    .pipe($.sass(sassOptions))
    .pipe($.autoprefixer({
      browsers: ['ie 7', 'ie 8'],
      cascade: false
    }))
    .pipe($.concat('ie-lt8.css'))
    .pipe($.cssnano())
    .pipe(gulp.dest(config.stylesOut));
});

gulp.task('sass', function () {
  gulp.src(['./src/scss/all.scss'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe($.concat('iteam.css'))
    .pipe($.sourcemaps.write('.', {
      sourceRoot: 'src/scss'
    }))
    .pipe(gulp.dest(config.stylesOut));
});

gulp.task('assemble', function () {
  gulp.src(config.pages)
    .pipe($.plumber())
    .pipe($.assemble(options))
    .pipe($.htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./out'));
});

gulp.task('watch', function () {
  gulp.watch(['src/layouts/**/*.hbs', config.pages, 'src/partials/**/*.hbs', 'src/**/*.md'], ['assemble']);
  gulp.watch(['./src/scss/**/*.scss'], ['sass', 'sass-ie']);
  gulp.watch('src/content/**/*', ['copy']);
  gulp.watch(['src/helpers/**/*.js', 'src/test/**/*.js'], ['jshint', 'test']);
  gulp.watch('./src/scripts/**/*.js', ['jshint', 'scripts']);
});

gulp.on('err', function (e) {
  console.log(e.err.stack);
});

gulp.task('default', function () {
    runSequence('test', [
      'build',
      'connect',
      'watch'
    ]);
});

gulp.task('build', [
  'copy',
  'jshint',
  'scripts',
  'sass',
  'sass-ie',
  'assemble'
]);
