var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src("./scss/app.scss")
    .pipe(sass())
    .pipe(gulp.dest("./public/css"))
    .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./scss/**', ['sass']);

});

gulp.task('server',function(){
    nodemon({
        'script': './server.js'
    });
});

gulp.task('default', ['server','watch']);