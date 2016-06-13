'use strict';
import babel from 'gulp-babel';
import clean from 'gulp-clean-css';
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
import uglify from'gulp-uglify';

      // colors for our console output
const ok          = colors.green.bold;
const err         = colors.red.bold;

      //  Our config object to hold paths, etc
const path = {
  src: 'src',
  pub: 'public',
  tests: 'test'
};

const jsPaths = {
  src: `${path.src}/scripts/**/*.js`,
  pub: `${path.pub}/scripts`
}

gulp.task('default', () => {
  runSequence(['clean'], ['scripts', 'lint'], ['watch'])
});



gulp.task('scripts', () => {
  return gulp.src(jsPaths.src)
    .pipe(babel({
      presets: ['es2015']
    }))
  .pipe(uglify()
  	.on('error', notify.onError((error) => {
  	return '\n\n ERROR: ' + error.formatted, error;
  	})))
  .pipe(concat('main.js'))
  .pipe(gulp.dest(jsPaths.pub));
})

gulp.task('lint', () => {
return gulp.src([path.js + '/*.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format());
  // .pipe(eslint.failAfterError())
})

gulp.task('styles', ()=> {
  return gulp.src(path.src + '/**/*.scss')
    .pipe()
    .pipe(gulp.dest(path.pub))

})

gulp.task('clean', () => {
	return del([path.pub]).then(paths => {
    gutil.log(ok('\nRemoved the following:\n' + paths.join('\n')));
  })
});

gulp.task('test', () => {
return gulp.src(path.tests, {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});
