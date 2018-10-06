const gulp = require('gulp')
const fs = require('fs')
const del = require('del')
const inlineStr = require('gulp-inline-str')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

const babelOptions = JSON.parse(fs.readFileSync('./.babelrc', 'utf8'))

const paths = {
  scripts: [ 'src/index.js', 'src/getDeviceId.js', 'src/havePropsChanged.js', 'src/errors.js', 'src/createBlob.js' ],
  worker: 'src/worker.js',
  jsQR: 'node_modules/jsqr/dist/jsQR.js',
  destination: './lib',
}

gulp.task('clean', function() {
  return del([ paths.destination + '/*.js' ])
})

gulp.task('worker', [ 'clean' ], function() {
  return gulp
    .src([ paths.jsQR, paths.worker ])
    .pipe(concat('worker.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.destination))
})

gulp.task('build', [ 'worker' ], function() {
  return gulp
    .src(paths.scripts)
    .pipe(inlineStr({ basePath: paths.destination }))
    .pipe(babel(babelOptions))
    .pipe(gulp.dest(paths.destination))
})

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, [ 'build' ])
})

// The default task (called when you run `gulp` from cli)
gulp.task('default', [ 'build' ])
