var gulp       = require('gulp')
,   less       = require('gulp-less')
,   livereload = require('gulp-livereload')
,   plumber    = require('gulp-plumber')
,   jade       = require('gulp-jade')
,   rename     = require('gulp-rename');

var config = {
  styles: 'src/less/**/',
  stylesOut: 'out/css/',
  allStyle: '*.less',
  mainStyle: '*.less',
  documents: 'src/document/**/*.jade'
};

gulp.task('less', function () {
  gulp.src(config.styles + config.mainStyle)
    .pipe(plumber())
    .pipe(less({
      compress: true
    }))
    .pipe(rename('iteam.css'))
    .pipe(gulp.dest(config.stylesOut));
});

gulp.task('templates', function() {
  gulp.src(config.documents)
    .pipe(jade())
    .pipe(gulp.dest('out/'));
});

gulp.task('watch', function () {
  gulp.watch([config.documents], ['templates']);
  gulp.watch([config.styles + config.allStyle], ['less']);

  var server = livereload();
  gulp.watch('out/**').on('change', function (file) {
      server.changed(file.path);
  });
});

gulp.task('default', ['less', 'templates', 'watch']);