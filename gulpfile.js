var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('./server');

gulp.task('styles', function () {
  return gulp.src('./sass/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./css'));
});

gulp.task('watch_styles', function () {
  gulp.watch('./sass/**/*.scss', ['styles']);
  gulp.watch('*.html', notifyLiveReload);
  gulp.watch('css/*.css', notifyLiveReload);
})

gulp.task('express', function() {
  var app = server.app;
  app.use(require('connect-livereload')({port: 35729}));
  app.listen(4000);
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

gulp.task('default', ['watch_styles','express','livereload']);