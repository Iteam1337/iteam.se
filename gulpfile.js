var gulp       = require('gulp')
,   less       = require('gulp-less')
,   plumber    = require('gulp-plumber')
,   connect    = require('gulp-connect')
,   jade       = require('gulp-jade')
,   rename     = require('gulp-rename');

var config = {
  styles: 'src/less/**/',
  stylesOut: 'out/css/',
  allStyle: '*.less',
  mainStyle: 'main.less',
  documents: 'src/document/**/*.jade'
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

gulp.task('templates', function() {
  gulp.src(config.documents)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('out/'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch([config.documents, 'src/jade_includes/**/*.jade'], ['templates']);
  gulp.watch([config.styles + config.allStyle], ['less']);
  gulp.watch('src/content/**/*', ['copy']);
});

gulp.task('default', ['copy', 'less', 'templates', 'connect', 'watch']);