'use strict'

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const assemble = require('assemble')
const runSequence = require('run-sequence')
const rimraf = require('rimraf')

const outPaths = {
  base: 'out/',
  styles: 'out/css/',
  scripts: 'out/scripts/',
  content: 'out/content/',
  fonts: 'out/content/fonts/'
}

const sassOptions = {
  outputStyle: 'compressed'
}

const assembleOptions = {
  data: 'src/data/*.{json,yml}',
  helpers: 'src/helpers/*.js',
  layout: 'default.hbs',
  layouts: 'src/layouts/*.hbs',
  layoutdir: 'src/layouts',
  partials: 'src/partials/**/*.hbs',

  defaultLayout: 'default.hbs',
  mergePartials: false,
  'default helpers': false,
  preferLocals: true,
  debugEngine: true
}

gulp.task('clean', () => {
  rimraf.sync(outPaths.base)
})

gulp.task('jshint', () => {
  gulp
    .src([
      'src/helpers/**/*.js',
      'src/test/**/*.js',
      'src/scripts/**/*.js'
    ])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
})

gulp.task('scripts', () => {
  gulp
    .src([
      './src/scripts/social/Social.js',
      './src/scripts/social/*.js',
      './src/scripts/**/*.js',
      './bower_components/wowjs/dist/wow.min.js'
    ])
    .pipe($.concat('all.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(outPaths.scripts))
})


gulp.task('test', done => {
  gulp
    .src(['src/test/**/*.js'], { read: false })
    .pipe($.plumber())
    .pipe($.mocha())
    .on('end', done)
})

gulp.task('connect', () => {
  gulp.src('./out/')
    .pipe($.webserver({
      host: process.env.host || 'localhost',
      livereload: true,
      port: 9000
    }))
})

gulp.task('copy', () => {
  gulp.src(['bower_components/ionicons/fonts/*'])
    .pipe(gulp.dest(outPaths.fonts))

  gulp.src(['src/content/**/*'])
    .pipe(gulp.dest(outPaths.content))
})

gulp.task('test', done => {
  gulp
    .src(['src/test/**/*.js'], { read: false })
    .pipe($.plumber())
    .pipe($.mocha())
    .on('end', done)
})

gulp.task('sass-ie', () => {
  gulp
    .src('./src/scss/ie.scss')
    .pipe($.plumber())
    .pipe($.sass(sassOptions))
    .pipe($.autoprefixer({
      browsers: ['ie 7', 'ie 8', 'ie 9'],
      cascade: false
    }))
    .pipe($.concat('ie.css'))
    // .pipe($.cssnano())
    .pipe(gulp.dest(outPaths.styles))
  gulp
    .src('./src/scss/ie-lt8.scss')
    .pipe($.plumber())
    .pipe($.sass(sassOptions))
    .pipe($.autoprefixer({
      browsers: ['ie 7', 'ie 8'],
      cascade: false
    }))
    .pipe($.concat('ie-lt8.css'))
    .pipe($.cssnano())
    .pipe(gulp.dest(outPaths.styles))
})

gulp.task('sass', () => {
  gulp
    .src(['./src/scss/all.scss'])
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
    .pipe(gulp.dest(outPaths.styles))
})

gulp.task('assemble', done => {
  gulp
    .src('src/pages/**/index.hbs')
    .pipe($.assemble(assemble, assembleOptions))
    .pipe(gulp.dest(outPaths.base))
    .on('end', done)
})

gulp.task('assemble:init', () => {
  assemble.option(assembleOptions)
  assemble.data(assembleOptions.data)
  assemble.helpers(assembleOptions.helpers)
  assemble.layouts(assembleOptions.layouts)
  assemble.partials(assembleOptions.partials)
  console.log(assemble)
})

gulp.task('watch', () => {
  gulp.watch(['src/**/*.hbs', 'src/**/*.yml', 'src/helpers/*.js', 'src/**/*.md'], ['assemble'])
  gulp.watch(['./src/scss/**/*.scss'], ['sass', 'sass-ie'])
  gulp.watch('src/content/**/*', ['copy'])
  gulp.watch(['src/helpers/**/*.js', 'src/test/**/*.js'], ['jshint', 'test'])
  gulp.watch('./src/scripts/**/*.js', ['jshint', 'scripts'])
})

gulp.on('err', event => {
  console.error(event.err.stack)
})

gulp.task('default', () => {
  runSequence('test', [
    'build',
    'connect',
    'watch'
  ])
})

gulp.task('build', [
  'copy',
  'jshint',
  'scripts',
  'sass',
  'sass-ie',
  'assemble:init',
  'assemble'
])
