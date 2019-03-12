import autoprefixer from 'gulp-autoprefixer';
import babelify from 'babelify';
import browserify from 'browserify';
import bower from 'gulp-bower';
import clean from 'gulp-clean-css';
import colors from 'colors/safe';
import concat from 'gulp-concat';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gutil from 'gulp-util';
import mocha from 'gulp-mocha';
import plumber from 'gulp-plumber';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';

// colors for our console output
const ok = colors.green.bold;
const error = colors.red.bold;

//  Our config object to hold paths, etc
const basePath = {
  bower: 'bower_components',
  pub: 'public',
  root: './',
  src: 'src',
  tests: '__tests__',
};

const file = {
  bootstrap: `${basePath.bower}/bootstrap/scss/`,
  jsPath: {
    src: `${basePath.src}/js/*`,
    server: `${basePath.src}/server/**`,
    models: `${basePath.src}/models/**`,
    pub: `${basePath.pub}/js`,
  },

  htmlPath: {
    src: `${basePath.src}/**/*.html`,
    pub: `${basePath.pub}/`,
  },

  cssPath: {
    bower: `${basePath.bower}`,
    pub: `${basePath.pub}/css`,
    src: `${basePath.src}/css`,
  },
  tests: `${basePath.tests}/**/*`,
};

gulp.task('default', () => {
  runSequence(['clean'], ['html'], ['css'], ['js'], ['watch']);
});

/*  WATCHING FILES  */
gulp.task('watch', () => {
  gulp.watch(`${file.cssPath.src}/**/*.scss`, ['css']);
  gulp.watch([file.jsPath.src], ['js']);
  gulp.watch(['./*.js', file.jsPath.server, file.jsPath.models], ['lint']);
  gulp.watch([file.htmlPath.src], ['html']);
});

gulp.task('js', ['lint'], () => {
  const b = browserify({
    entries: ['./src/js/chart.js', './src/js/gauge.js'],
    debug: true,
  }).transform(babelify, { presets: ['es2015'] });

  return b.bundle()
    .pipe(source('./src/js/'))
    .pipe(buffer())

    .pipe(sourcemaps.init())
    .pipe(uglify()
      .on('error', (err) => {
        gutil.log(error('ERR:', err));
      }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(file.jsPath.pub));
});

gulp.task('lint', () => {
  return gulp.src([file.jsPath.src, file.jsPath.server, './gulpfile.babel.js', './server.js'])
    .pipe(eslint())
    .pipe(eslint.format());
  // .pipe(eslint.failAfterError())
});

gulp.task('html', () => {
  return gulp.src(file.htmlPath.src)
    .pipe(gulp.dest(file.htmlPath.pub));
});

//  TODO: create a BUILD task for the BS additions Make the other for local updates.
//  compile local files in a diff task. add to BS only on build command...
gulp.task('bower', () => {
  return bower()
    .pipe(gulp.dest(`${basePath.bower}/`));
});

gulp.task('css', ['bower'], () => {
  return gulp.src(`${file.cssPath.src}/main.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({
      style: 'compressed',
      includePaths: [
        file.bootstrap,
        file.cssPath.src,
      ],
    }).on('error', gutil.log))
    .pipe(autoprefixer())
    .pipe(clean())
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
