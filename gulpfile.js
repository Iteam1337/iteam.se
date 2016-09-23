'use strict'

const assemble = require('assemble')
const app = assemble()

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const runSequence = require('run-sequence')
const rimraf = require('rimraf')
const imageop = require('gulp-image-optimization')

const mergeContext = require('./lib/mergeContext')
const getConfigs = require('./lib/getConfigs')

const outPaths = {
  base: 'out',
  styles: 'out/css/',
  scripts: 'out/scripts/',
  content: 'out/content/',
  fonts: 'out/content/fonts/',
  images: 'out/content/images/'
}

const sassOptions = {
  outputStyle: 'compressed'
}

const assemblePaths = {
  data: 'src/data/**/*.yml',
  helpers: 'src/helpers/*.js',
  layoutdir: 'src/layouts',
  layouts: 'src/layouts/**/*.hbs',
  partials: 'src/partials/*.hbs',
  assets: 'src/content',
  pages: 'src/pages/**/index.hbs'
}

const assembleOptions = {
  layoutDelims: ['{%', '%}']
}

gulp.task('clean', () =>
  rimraf.sync(outPaths.base))

gulp.task('jshint', () =>
  gulp
    .src([
      'lib/**/*.js',
      'src/scripts/**/*.js'
    ])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish')))

gulp.task('scripts', () =>
  gulp
    .src([
      './src/scripts/social/Social.js',
      './src/scripts/social/*.js',
      './src/scripts/**/*.js',
      './bower_components/wowjs/dist/wow.min.js'
    ])
    .pipe($.concat('all.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(outPaths.scripts)))

gulp.task('test', done => {
  gulp
    .src(['src/test/**/*.js'], {read: false})
    .pipe($.plumber())
    .pipe($.mocha())
    .on('end', done)
})

gulp.task('images', cb => {
    gulp
      .src(['src/**/*.png','src/**/*.jpg','src/**/*.gif','src/**/*.jpeg'])
      .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest(outPaths.images))
      .on('end', cb)
      .on('error', cb)
})

gulp.task('connect', () =>
  gulp.src('./out/', {read: false})
    .pipe($.webserver({
      host: process.env.host || 'localhost',
      livereload: process.env.livereload || true,
      port: process.env.port || 9000
    })))

gulp.task('copy', () => {
  gulp.src(['bower_components/ionicons/fonts/*'])
    .pipe(gulp.dest(outPaths.fonts))

  gulp.src(['src/content/**/*'])
    .pipe(gulp.dest(outPaths.content))
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
    .pipe($.importCss())
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

gulp.task('sass', () =>
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
    .pipe($.importCss())
    .pipe($.sourcemaps.write('.', {
      sourceRoot: 'src/scss'
    }))
    .pipe(gulp.dest(outPaths.styles)))

gulp.task('assemble', done =>
  app.build('content', _ => done()))

gulp.task('watch', () => {
  gulp.watch(['src/pages/**/*'], ['assemble'])
  gulp.watch([
    'src/layouts/**/*',
    'src/partials/**/*',
    'src/helpers/**/*'
  ], ['assemble'])
  gulp.watch(['src/scss/**/*'], ['sass', 'sass-ie'])
  gulp.watch(['src/content/**/*'], ['copy'])
  gulp.watch([
    'src/helpers/**/*.js',
    'src/test/**/*.js',
    'lib/**/*.js'
  ], ['jshint', 'test'])
  gulp.watch(['src/scripts/**/*.js'], ['jshint', 'scripts'])
})

gulp.on('err', event => console.error(event.err.stack))

gulp.task('default', () =>
  runSequence('test', 'build', 'connect', 'watch'))

gulp.task('build', [
  'copy',
  'jshint',
  'scripts',
  'sass',
  'sass-ie',
  'assemble',
  'images'
])

app.task('init', done => {
  app.option('layoutDelims', assembleOptions.layoutDelims)
  app.option('mergeContext', mergeContext)
  getConfigs(assemblePaths.data)
    .then(config => {
      assembleOptions.defaults = config
      app.option('defaults', config)
      app.helpers(assemblePaths.helpers)
      app.partials(assemblePaths.partials)
      app.pages(assemblePaths.pages)
      app.layouts(assemblePaths.layouts)
      done()
    })
})

app.task('content', ['init'], () =>
  app
    .toStream('pages')
    .pipe(app.renderFile())
    .on('error', error => {
      console.log('error', error)
    })
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe($.extname())
    .pipe(gulp.dest(outPaths.base)))
