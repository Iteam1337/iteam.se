'use strict';

function formatPagePath (pagePath) {
  return pagePath
    .replace(path.resolve(process.cwd(), 'src/pages'), '')
    .replace(path.extname(pagePath), '.html');
}

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


var runSequence = require('run-sequence');
var rimraf = require('rimraf');
var path = require('path');

var options = {
  partials: 'src/partials/*.hbs',
  layoutdir: 'src/layouts/',
  helpers: [
    'src/helpers/**/*.js'
  ]
};

var config = {
  stylesOut: 'out/css/',
  pages: [
    './src/pages/**/*.hbs'
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

gulp.task('sass', function () {
  gulp.src('./src/scss/all.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'compressed'
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe($.sourcemaps.write())
    .pipe($.rename('iteam.css'))
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
  gulp.watch(['./src/scss/**/*.scss'], ['sass']);
  gulp.watch('src/content/**/*', ['copy']);
  gulp.watch(['src/helpers/**/*.js', 'src/test/**/*.js'], ['jshint', 'test']);
  gulp.watch('./src/scripts/**/*.js', ['jshint', 'scripts']);
});

gulp.on('err', function (e) {
  console.log(e.err.stack);
});

gulp.task('s3', function () {
  var aws = {
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    access: 'public-read',
    region: 'eu-west-1',
    bucket: 'test.iteam.se'
  };

  var publisher = $.awspublish.create(aws);

  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('./out/**/*')
    // .pipe($.debug({verbose: true}))
    .pipe(publisher.publish(headers))
    .pipe($.awspublish.reporter())
});

gulp.task('default', function () {
    runSequence('test', [
      'build',
      'connect',
      'watch'
    ]);
});

// gulp.task('default', ['test'], function () {
//   gulp.start([
//     'build',
//     'connect',
//     'watch'
//   ]);
// });

gulp.task('build', [
  'copy',
  'jshint',
  'scripts',
  'sass',
  'assemble'
]);

gulp.task('deploy:master', [
  's3'
]);
