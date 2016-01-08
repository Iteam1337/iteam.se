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
  pages: 'src/pages/**/index.hbs',
  data: 'src/data/**/*.yml',
  defaultsData: './src/data/defaults'
}

const assembleOptions = {
  assets: assemblePaths.assets,
  layoutdir: assemblePaths.layoutdir,
  layoutDelims: ['{{', '}}'],
  helpers: assemblePaths.helpers,
  partials: assemblePaths.partials,

  'default engines': true,
  preferLocals: true,

  data: assemblePaths.data,
  defaults: require(assemblePaths.defaultsData),

  renameKey: fp => {
    let key
    if (path.dirname(fp).match(/src\/pages/) === null) {
      key = path.basename(fp, path.extname(fp))
    } else {
      key = path
        .join(path.dirname(fp), path.basename(fp, path.extname(fp)))
        .replace(`${__dirname}/src/pages/`, '')
    }
    return key
  },

  mergeContext: (template, locals) => {
     if (!locals.options || !locals.options.defaults) {
      return
    }
    if (!template.data) {
      template.data = {}
    }
    template.data = Object.assign({}, locals.options.defaults, template.data)
  }
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
  gulp
    .src(assemblePaths.pages)
    .pipe($.assemble(assemble, assembleOptions))
    .on('data', file => {
      console.log(file)
    })
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe($.extname())
    .pipe(gulp.dest(outPaths.base))
    .on('end', done)
})

gulp.task('assemble:init', done => {
  assemble.option('default engines', assembleOptions['default engines'])
  assemble.option('preferLocals', assembleOptions.preferLocals)
  assemble.option('assets', assembleOptions.assets)
  assemble.option('layoutdir', assembleOptions.layoutdir)
  assemble.option('layoutDelims', assembleOptions.layoutDelims)
  assemble.option('helpers', assembleOptions.helpers)
  assemble.option('renameKey', assembleOptions.renameKey)
  assemble.option('defaults', assembleOptions.defaults)
  assemble.option('mergeContext', assembleOptions.mergeContext)

  assemble.helpers(assemblePaths.helpers)
  assemble.layouts(assemblePaths.layouts)
  assemble.partials(assemblePaths.partials)

  assemble.onLoad(/index\.hbs/, (file, next) => {
    if (file.content === '') {
      file.content = ' '
    }
    next()
  })
  done()
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
