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
      $.connect.server({
        root: [paths.dstDir + '/theme/' + make.device[i] + '/'],
        port: ports.static + (10 * i),
        livereload: true
      });
    }
  } else {
    $.connect.server({
      root: [paths.dstDir],
      port: ports.static,
      livereload: true
    });
  }
});
