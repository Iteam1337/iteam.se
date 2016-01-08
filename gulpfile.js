'use strict'

const assemble = require('assemble')
const app = assemble()

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const runSequence = require('run-sequence')
const rimraf = require('rimraf')

const mergeContext = require('./lib/mergeContext')
const renameKey = require('./lib/renameKey')
const indexOnLoad = require('./lib/indexOnLoad')

const outPaths = {
  base: 'out',
  styles: 'out/css/',
  scripts: 'out/scripts/',
  content: 'out/content/',
  fonts: 'out/content/fonts/'
}

const sassOptions = {
  outputStyle: 'compressed'
}

const assemblePaths = {
  helpers: 'src/helpers/*.js',
  layoutdir: 'src/layouts',
  layouts: 'src/layouts/**/*.hbs',
  partials: 'src/partials/*.hbs',
  assets: 'src/content',
  pages: 'src/pages/**/index.hbs'
}

const assembleOptions = {
  // assets: assemblePaths.assets,
  // layoutdir: assemblePaths.layoutdir,
  // layout: 'default',
  // helpers: ['handlebars-helpers', assemblePaths.helpers],
  layoutDelims: ['{%', '%}'],
  // namespace: false,
  // helpers: [assemblePaths.helpers],
  // partials: [assemblePaths.partials],
  // layouts: [assemblePaths.layouts],
  // renameKey: renameKey,
  // mergeContext: mergeContext,
  defaults: require('./src/data/defaults')
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
  done()
  // gulp
  //   .src(['src/test/**/*.js'], { read: false })
  //   .pipe($.plumber())
  //   .pipe($.mocha())
  //   .on('end', done)
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
  app.build('content', _ => {
    // console.log(app)
    done()
  })
})

gulp.task('watch', () => {
  gulp.watch(['src/pages/**/*'], ['assemble'])
  gulp.watch(['src/layouts/**/*', 'src/partials/**/*', 'src/helpers/**/*'], ['assemble'])
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
  'assemble'
])

app.task('init', done => {
  // app.enable('verbose')
  // app.option('assets', assembleOptions.assets)
  // app.option('layoutdir', assembleOptions.layoutdir)
  app.option('layoutDelims', assembleOptions.layoutDelims)
  app.option('defaults', assembleOptions.defaults)
  // app.option('namespace', assembleOptions.namespace)
  // app.option('renameKey', renameKey)
  app.option('mergeContext', mergeContext)
  // app.option('helpers', assembleOptions.helpers)
  // app.option('layouts', assembleOptions.layouts)
  // app.option('layout', assembleOptions.layout)
  // app.option('helpers', assembleOptions.helpers)
  // app.option('partials', assembleOptions.partials)

  // app.pages(assemblePaths.pages)
  app.helpers(assemblePaths.helpers)
  app.partials(assemblePaths.partials)
  app.layouts(assemblePaths.layouts)

  // app.onLoad(/index\.hbs/, indexOnLoad)
  done()
})

app.task('content', ['init'], () =>
  app
    // .pages
    // .src(assemblePaths.pages, assembleOptions)
    .src('src/pages/index.hbs', assembleOptions)
    .pipe(app.renderFile())
    .on('data', file => {
      console.log('file', file)
    })
    .on('err', err => {
      console.log('err', err)
    })
    // .pipe($.assemble(assemble, assembleOptions))
    // .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe($.extname())
    .pipe(gulp.dest(outPaths.base)))
