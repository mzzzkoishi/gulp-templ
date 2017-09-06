/* --------------------
// $gulp connect
-------------------- */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    paths = require('../config').base,
    make = require('../config').make,
    ports = require('../config').ports;

gulp.task('connect', function() {
  if(make.device.length){
    for(var i = 0; i < make.device.length; i++) {
      gulp.src(paths.dstDir + '/theme/' + make.device[i] + '/')
        .pipe($.webserver({
          port: ports.static + (10 * i),
          livereload: true,
          fallback: 'index.html'
        }));
    }
  } else {
    gulp.src(paths.dstDir)
      .pipe($.webserver({
        livereload: true,
        port: ports.static,
        fallback: 'index.html'
      }));
  }
});
