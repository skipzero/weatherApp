'use strict';
import browserify from 'browserify';
// import babel from 'gulp-babel';
import babelify from 'babelify';
import colors from 'colors/safe';
import concat from 'gulp-concat';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gutil from 'gulp-util';
import mocha from 'gulp-mocha';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

      // colors for our console output
const ok = colors.green.bold;
// const error = colors.red.bold;

//  Our config object to hold paths, etc
const basePath = {
  root: './',
  src: 'src',
  pub: 'public',
  tests: 'test',
};
const file = {
  jsPath: {
    src: `${basePath.src}/js/d3example.js`,
    server: `${basePath.src}/server/**`,
    models: `${basePath.src}/models/**`,
    pub: `${basePath.pub}/js`,
  },

  htmlPath: {
    src: `${basePath.src}/**/*.html`,
    pub: `${basePath.pub}/`,
  },

  cssPath: {
    src: `${basePath.src}/css/*.scss`,
    pub: `${basePath.pub}/css`,
  },
  tests: `${basePath.tests}/*`,
};

gulp.task('default', () => {
  runSequence(['clean'], ['js'], ['css'], ['html'], ['watch']);
});

gulp.task('watch', () => {
  gulp.watch(file.cssPath.src, ['css']);
  gulp.watch([file.jsPath.src], ['js']);
  gulp.watch([`${basePath.root}/*.js`, file.jsPath.models], ['lint']);
  gulp.watch([file.htmlPath.src], ['html']);
});

gulp.task('js', ['lint'], () => {
  const b = browserify({
    entries: './src/js/d3example.js',
    debug: true,
  }).transform(babelify, { presets: ['es2015'] });

  return b.bundle()
    .pipe(source('./src/js/d3example.js'))
    .pipe(buffer())
  // return gulp.src(file.jsPath.src)
    .pipe(sourcemaps.init())
    .pipe(uglify()
      .on('error', (err) => {
        gutil.log(err('ERR:', err));
      }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(file.jsPath.pub));
});

gulp.task('lint', () => {
  return gulp.src([file.jsPath.src, './gulpfile.babel.js', './api.js'])
  .pipe(eslint())
  .pipe(eslint.format());
  // .pipe(eslint.failAfterError())
});

gulp.task('html', () => {
  return gulp.src(file.htmlPath.src)
    .pipe(gulp.dest(file.htmlPath.pub));
});

gulp.task('css', () => {
  return gulp.src(file.cssPath.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      style: 'compressed',
      includePaths: [
        basePath.styles,
      ],
    }).on('error', notify.onError((err) => {
      return `\n\n ERROR: ${err.formatted} ${err}`;
    })))
    // .pipe(clean())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(file.cssPath.pub));
});

gulp.task('clean', () => {
  return del([basePath.pub]).then(paths => {
    gutil.log(ok(`\nRemoved the following:\n ${paths.join('\n')}`));
  });
});

gulp.task('test', () => {
  return gulp.src(file.tests, { read: false })
    .pipe(plumber())
    .pipe(mocha({
      report: '@ripter/mocha-reporter-blink1',
    }));
});
