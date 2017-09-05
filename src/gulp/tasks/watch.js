/* --------------------
// $gulp watch
-------------------- */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    paths = require('../config').base,
    make = require('../config').make;


gulp.task('watch',function(){
  if(make.device.length){
    for(var i = 0; i < make.device.length; i++) {
      gulp.watch(paths.srcDir + '/theme/' + make.device[i] + '/sass/**/*.scss', ['sass','styleguide']);
      gulp.watch(paths.srcDir + '/theme/' + make.device[i] + '/js/**/*.js', ['js-minify']);
      gulp.watch(paths.srcDir + '/theme/' + make.device[i] + '/tmpl/**/*', ['tmpl']);
    }
  } else {
    gulp.watch(paths.srcDir + '/sass/**/*.scss', ['sass','styleguide']);
    gulp.watch(paths.srcDir + '/js/**/*.js', ['js-minify']);
    gulp.watch(paths.srcDir + '/tmpl/**/*', ['tmpl']);
  }
});
