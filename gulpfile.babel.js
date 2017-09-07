import autoprefixer from 'gulp-autoprefixer';
import babelify from 'babelify';
import browserify from 'browserify';
import bower from 'gulp-bower';
import buffer from 'vinyl-buffer';
import clean from 'gulp-clean-css';
import colors from 'colors/safe';
import concat from 'gulp-concat';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gutil from 'gulp-util';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';

// colors for our console output
const ok = colors.green.bold;

//  Our config object to hold paths, etc
const config = {
  server: './server',
  models: './models',
  bower: './bower_components',
  bootstrap: './bower_components/bootstrap',
  src: {
    css: './src/css',
    js: './src/js',
    html: './src/**/*.html',
    img: './src/images',
  },
  dest: {
    css: './public/css',
    js: './public/js',
    html: './public',
    img: './public/images',
  },
};

gulp.task('default', () => {
  runSequence(['clean'], ['css'], ['img'], ['js'], ['watch']);
});

gulp.task('prod', () => {
  runSequence(['clean'], ['css'], ['img'], ['js'],);
});

/*  WATCHING FILES  */
gulp.task('watch', () => {
  gulp.watch(`${config.src.css}/**`, ['css']);
  gulp.watch([`${config.src.js}/**`], ['js']);
  gulp.watch([`${config.src.js}/**`, `${config.server}/*`, `${config.models}/*`], ['lint']);
});

gulp.task('js', ['lint'], () => {
  const b = browserify({
    entries: [`${config.src.js}/chart.js`, `${config.src.js}/gauge.js`],
    debug: true,
  }).transform(babelify, { presets: ['es2015'] });

  return b.bundle()
    .pipe(source(config.src.js))
    .pipe(buffer())

    .pipe(sourcemaps.init())
    // .pipe(uglify()
    //   .on('error', (err) => {
    //     gutil.log(error('ERR:', err));
    //   }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.js));
});

gulp.task('img', () => {
  return gulp.src(`${config.src.img}/**/*`)
  .pipe(gulp.dest('./public/images'));
});

gulp.task('lint', () => {
  return gulp.src([`${config.src.js}/**/*`, `${config.server}/*`, './server.js'])
  .pipe(eslint())
  .pipe(eslint.format());
  // .pipe(eslint.failAfterError())
});

// gulp.task('html', () => {
//   return gulp.src(config.src.html)
//     .pipe(gulp.dest(config.dest.html));
// });

//  TODO: create a BUILD task for the BS additions Make the other for local updates.
//  compile local files in a diff task. add to BS only on build command...
gulp.task('bower', () => {
  return bower()
    .pipe(gulp.dest(`${config.bower}/`));
});

gulp.task('css', ['bower'], () => {
  return gulp.src(`${config.src.css}/main.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({
      style: 'compressed',
      includePaths: [
        `${config.bootstrap}/scss`,
        config.src.css,
      ],
    }).on('error', gutil.log))
    .pipe(autoprefixer())
    .pipe(clean())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('clean', () => {
  return del(['./public/**', config.bower]).then(paths => {
    gutil.log(ok(`\nRemoved the following:\n ${paths.join('\n')}`));
  });
});

// gulp.task('test', () => {
//   return gulp.src(config.tests, { read: false })
//     .pipe(plumber())
//     .pipe(mocha({
//       report: '@ripter/mocha-reporter-blink1',
//     }));
// });
