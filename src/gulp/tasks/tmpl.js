/* --------------------
// templateEngine -> html
-------------------- */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    paths = require('../config').base,
    make = require('../config').make,
    use = require('../config').use;

gulp.task('tmpl', function() {
  var srcPath = [],
      dstPath = [];
  
  if(make.device.length){
    for(var i = 0; i < make.device.length; i++) {
      srcPath.push(paths.srcDir + '/theme/' + make.device[i] + '/tmpl/');
      dstPath.push(paths.dstDir + '/theme/' + make.device[i]);
    }
    forNum = make.device.length;
  } else {
    srcPath.push(paths.srcDir + '/tmpl/');
    dstPath.push(paths.dstDir);
    forNum = 1;
  }
  
  for(var i = 0; i < forNum; i++) {
    if(use.templateEngine === 'ejs') {
      gulp.src([srcPath[i] + '*.ejs'])
        .pipe($.plumber())
        .pipe($.ejs())
        .pipe($.rename({
        extname: ".html"
      }))
        .pipe(gulp.dest(dstPath[i]))
        .pipe($.connect.reload());
    } else if(use.templateEngine === 'pug') {
      gulp.src([srcPath[i] + '*.pug'])
        .pipe($.plumber())
        .pipe($.pug())
        .pipe(gulp.dest(dstPath[i]))
        .pipe($.connect.reload());
    }
  }
});