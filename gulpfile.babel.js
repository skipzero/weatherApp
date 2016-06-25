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
import uglify from 'gulp-uglify';

      // colors for our console output
const ok   = colors.green.bold;
const err  = colors.red.bold;

      //  Our config object to hold paths, etc
const basePath = {
  src: 'src',
  pub: 'public',
  tests: 'test',
};
const file = {
  scriptsPath: {
    src: `${basePath.src}/**/*.js`,
    pub: `${basePath.pub}/scripts`
  },

  htmlPath: {
    src: `${basePath.src}/**/*.html`,
    pub: `${basePath.pub}`,
  },

  stylesPath: {
    src: `${basePath.src}/**/*.scss`,
    pub: `${basePath.pub}/styles`,
  }
}

gulp.task('default', () => {
  runSequence(['clean'], ['scripts'], ['styles'], ['html'], ['watch'])
});

gulp.task('watch', () => {
  gulp.watch(file.stylesPath.src, ['sass']);
  gulp.watch([file.scriptsPath.src], ['scripts']);
  gulp.watch([file.htmlPath.src], ['html']);
});

gulp.task('scripts', ['lint'], () => {
  return gulp.src(file.scriptsPath.src)
    .pipe(babel({
      presets: ['es2015']
    }))
  // .pipe(uglify()
  // 	.on('error', notify.onError((error) => {
  // 	return '\n\n ERROR: ' + error.formatted, error;
  // 	})))
  .pipe(concat('main.js'))
  .pipe(gulp.dest(file.scriptsPath.pub));
});

gulp.task('lint', () => {
  return gulp.src([file.scriptsPath.src])
  .pipe(eslint())
  .pipe(eslint.format());
  // .pipe(eslint.failAfterError())
})

gulp.task('html', () => {
  return gulp.src(file.htmlPath.src)
    .pipe(gulp.dest(file.htmlPath.pub))
});

gulp.task('styles', ()=> {
  return gulp.src(file.stylesPath.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      style: 'compressed',
      includePaths: [
        basePath.styles
      ]
    }).on('error', notify.onError((error) => {
      return '\n\n ERROR: ' + error.formatted, error;
    })))
    // .pipe(clean())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(file.stylesPath.pub));
});

gulp.task('clean', () => {
	return del([basePath.pub]).then(paths => {
    gutil.log(ok('\nRemoved the following:\n' + paths.join('\n')));
  })
});

gulp.task('test', () => {
return gulp.src(path.tests, {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});
