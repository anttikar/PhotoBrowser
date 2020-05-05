var gulp   = require('gulp');
var deploy = require('gulp-gh-pages');
var paths = require('../paths');

gulp.task('deploy', function () {
  //return gulp.src(paths.exportSrvRoot)
  return gulp.src('./export/**/*')
    .pipe(deploy({
      remoteUrl: "https://github.com/anttikar/anttikar.github.io.git",
      branch: "master"
    }))
});
