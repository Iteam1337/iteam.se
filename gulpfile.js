var gulp       = require('gulp')
,   less       = require('gulp-less')
,   plumber    = require('gulp-plumber')
,   connect    = require('gulp-connect')
,   jade       = require('gulp-jade')
,   rename     = require('gulp-rename');

var assemble = require('gulp-assemble');
var htmlmin = require('gulp-htmlmin');

var config = {
  styles: 'src/less/**/',
  stylesOut: 'out/css/',
  allStyle: '*.less',
  mainStyle: 'main.less',
  documents: 'src/pages/**/*.hbs'
};

gulp.task('connect', function() {
  connect.server({
    root: 'out',
    livereload: true
  });
});

gulp.task('copy', function () {
  gulp.src('src/content/**/*')
    .pipe(gulp.dest('out/content'));

  gulp.src('src/scripts/**/*')
    .pipe(gulp.dest('out/scripts'))
    .pipe(connect.reload());
});

gulp.task('less', function () {
  gulp.src(config.styles + config.mainStyle)
    .pipe(plumber())
    .pipe(less({
      compress: true
    }))
    .pipe(rename('iteam.css'))
    .pipe(gulp.dest(config.stylesOut))
    .pipe(connect.reload());
});

var options = {
  data: 'src/data/*.json',
  partials: 'src/partials/*.hbs',
  layoutdir: 'src/layouts/',
  helpers: ['src/scripts/handlebar-helpers.js']
};

gulp.task('assemble', function () {
  gulp.src([config.documents])
    .pipe(plumber())
    .pipe(assemble(options))
    .pipe(htmlmin({
      collapseWhitespace:true
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('out/'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch([config.documents, 'src/partials/**/*.hbs', 'src/data/**/*.json'], ['assemble']);
  gulp.watch([config.styles + config.allStyle], ['less']);
  gulp.watch('src/content/**/*', ['copy']);
  gulp.watch('src/scripts/**/*', ['copy']);
});

gulp.task('default', ['copy', 'less', 'assemble', 'connect', 'watch']);