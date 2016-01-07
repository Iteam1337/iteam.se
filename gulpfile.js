'use strict'

const path = require('path')
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const assemble = require('assemble')
const runSequence = require('run-sequence')
const rimraf = require('rimraf')


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
    .src(assemblePaths.pages)
    .pipe($.assemble(assemble, {}))
    .on('data', file => {
      console.log(file)
    })
    .pipe($.htmlmin())
    .pipe($.extname())
    .pipe(gulp.dest(outPaths.base))
    .on('end', done)

    // console.log(assemble)
})

gulp.task('assemble:init', () => {
  assemble.disable('preferLocals')
  assemble.disable('default engines')

  assemble.enable('debugEngine')
  assemble.enable('mergePartials')

  assemble.option('assets', assemblePaths.assets)
  assemble.option('layout', 'default')
  assemble.option('layoutdir', assemblePaths.layoutdir)
  assemble.option('layoutDelims', ['{{%', '%}}'])
  assemble.option('defaults', {
    renderable: true,
    isRenderable: true,
    isPartial: false
  })

  assemble.option('renameKey', fp => {
    let key
    if (path.dirname(fp).match(/src\/pages/) === null) {
      key = path.basename(fp, path.extname(fp))
    } else {
      key = path
        .join(path.dirname(fp), path.basename(fp, path.extname(fp)))
        .replace(`${__dirname}/src/pages/`, '')
    }
    return key
  })

  assemble.helpers([assemblePaths.helpers])
  assemble.layouts([assemblePaths.layouts])
  assemble.partials([assemblePaths.partials])

   console.log(assemble)
})

gulp.task('watch', () => {
  gulp.watch(['src/pages/**/*'], ['assemble'])
  gulp.watch(['src/layouts/**/*', 'src/partials/**/*', 'src/helpers/**/*'], ['assemble:init', 'assemble'])
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
