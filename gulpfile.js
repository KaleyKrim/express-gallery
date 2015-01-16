
var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('./app/app.js');

gulp.task('styles', function () {
  return gulp.src('./app/sass/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./app/css/'));
});

gulp.task('watch_styles', function () {
  gulp.watch('./app/sass/**/*.scss', ['styles']);
  gulp.watch('./app/views/*.jade', notifyLiveReload);
  gulp.watch('./app/css/*.css', notifyLiveReload);
});

gulp.task('express', function() {
  server.use(require('connect-livereload')({port: 35729}));
  server.listen(4000);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(35729);
});


gulp.task('default', ['styles','watch_styles','express','livereload']);