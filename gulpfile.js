'use strict';

var gulp       = require('gulp');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var plumber    = require('gulp-plumber');
var webserver  = require('gulp-webserver');
var rename     = require('gulp-rename');
var assemble   = require('gulp-assemble');
var htmlmin    = require('gulp-htmlmin');
var jshint     = require('gulp-jshint');
var mocha      = require('gulp-mocha');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var plugins    = require('gulp-load-plugins')();
var rimraf     = require('rimraf');
var awspublish = require('gulp-awspublish');
var foreach    = require('gulp-foreach');
var path       = require('path');
var debug      = require('gulp-debug');

function formatPagePath(pagePath) {
  return pagePath
    .replace(path.resolve(process.cwd(), 'src/pages'), '')
    .replace(path.extname(pagePath), '.html');
  }

gulp.task('clean', function () {
  rimraf.sync('./out');
});

var config = {
  stylesOut: 'out/css/',
  pages: [
    './src/pages/**/*.hbs'
  ]
};

gulp.task('jshint', function () {
  gulp.src(['src/helpers/**/*.js', 'src/test/**/*.js', 'src/scripts/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function() {
  gulp.src('./src/scripts/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./out/scripts'));
});

gulp.task('test', function () {
  gulp.src(['src/test/**/*.js'], { read: false })
    .pipe(plumber())
    .pipe(mocha());
});

gulp.task('connect', function () {
  gulp.src('./out/')
    .pipe(webserver({
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
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'compressed'
      }))
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
    .pipe(sourcemaps.write())
    .pipe(rename('iteam.css'))
    .pipe(gulp.dest(config.stylesOut));
});

var options = {
  partials: 'src/partials/*.hbs',
  layoutdir: 'src/layouts/',
  helpers: [
    'src/helpers/**/*.js'
  ]
};

var oldFiles = 0;

gulp.task('assemble', function () {
  gulp.src(config.pages)
    .pipe(plumber())
    .pipe(assemble(options))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('./out'));
});

gulp.task('watch', function () {
  gulp.watch(['src/layouts/**/*.hbs', config.pages, 'src/partials/**/*.hbs', 'src/**/*.md'], ['assemble']);
  gulp.watch(['./src/scss/**/*.scss'], ['sass']);
  gulp.watch('src/content/**/*', ['copy']);
  gulp.watch(['src/helpers/**/*.js','src/test/**/*.js'], ['jshint', 'test']);
  gulp.watch('./src/scripts/**/*.js', ['jshint', 'scripts']);
});

gulp.on('err', function(e) {
  console.log(e.err.stack);
});

gulp.task('s3', function () {
  var aws = {
    key : process.env.AWS_ACCESS_KEY_ID,
    secret : process.env.AWS_SECRET_ACCESS_KEY,
    access: 'public-read',
    region: 'eu-west-1',
    bucket: 'test.iteam.se'
  };

  var publisher = awspublish.create(aws);

  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('./out/**/*')
    //.pipe(debug({verbose: true}))
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});

gulp.task('default', [
  'copy',
  'jshint',
  'scripts',
  'sass',
  'assemble',
  'connect',
  'test',
  'watch'
]);

gulp.task('build', [
  'clean',
  'copy',
  'jshint',
  'scripts',
  'assemble'
]);


gulp.task('deploy:master', [
  's3'
]);
