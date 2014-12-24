var gulp = require('gulp'),
    concat = require('gulp-concat');

gulp.task('build', function () {
  gulp.src('src/**/*.js')
  .pipe(concat('angular-chromecast.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);

gulp.task('watch', ['build'], function () {
  gulp.watch('src/**/*.js', ['build']);
});
