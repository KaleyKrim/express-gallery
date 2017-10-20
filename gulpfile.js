var gulp = require('gulp')
var scss = require('gulp-sass')
var browserSync = require('browser-sync').create()

browserSync.init({
  server: {
    baseDir: "./public"
  }
});

gulp.task('scss', function () {
  return gulp.src('./scss/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function (){
  gulp.watch('./scss/**/*', ['scss'])
  gulp.watch('./public/**/*').on('change', browserSync.reload);
})

gulp.task('default', ['watch']);