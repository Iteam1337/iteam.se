var gulp      = require('gulp')
,   less      = require('gulp-less')
,   plumber   = require('gulp-plumber')
,   webserver = require('gulp-webserver')
,   rename    = require('gulp-rename')
,   assemble  = require('gulp-assemble')
,   htmlmin   = require('gulp-htmlmin')
,   jshint    = require('gulp-jshint')
,   mocha     = require('gulp-mocha')
,   concat    = require('gulp-concat')
,   uglify    = require('gulp-uglify')
,   rimraf    = require('gulp-rimraf')
,   awspublish = require('gulp-awspublish');

gulp.task('clean', function (cb) {
  return gulp.src('./out/**/*', { read: false })
    .pipe(rimraf(cb));
});

var config = {
  styles: 'src/less/**/',
  stylesOut: 'out/css/',
  allStyle: '*.less',
  mainStyle: 'main.less',
  pages: './src/pages/**/*.hbs'
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
    .pipe(mocha({
      reporter: 'Spec'
    }));
});

gulp.task('connect', function () {
  gulp.src('out')
    .pipe(webserver({
      livereload: true
    }));
});

gulp.task('copy', function () {
  gulp.src(['bower_components/ionicons/fonts/*'])
    .pipe(gulp.dest('out/content/fonts'));

  gulp.src(['src/content/**/*'])
    .pipe(gulp.dest('out/content'));
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
    'src/helpers/**/*.js',
    'node_modules/handlebars-helper-partial/index.js',
    'node_modules/handlebars-helpers/index.js'
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
  gulp.watch(['src/layouts/**/*', config.pages, 'src/partials/**/*.hbs', 'src/**/*.md'], ['assemble']);
  gulp.watch([config.styles + config.allStyle], ['less']);
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
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});


gulp.task('default', [
  'copy',
  'jshint',
  'scripts',
  'test',
  'less',
  'assemble',
  'connect',
  'watch'
]);


gulp.task('build', [
  'copy',
  'jshint',
  'scripts',
  'test',
  'less',
  'assemble'
]);


gulp.task('deploy:master', [
  'build',
  's3'
]);
