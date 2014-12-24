var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('build', function () {
  gulp.src('src/**/*.js')
  .pipe(concat('angular-chromecast.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('compress', ['build'], function () {
  gulp.src('dist/angular-chromecast.js')
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);

gulp.task('compile', ['build', 'compress']);

gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*.js', ['build']);
});
