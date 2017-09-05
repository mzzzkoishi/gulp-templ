/* --------------------
// sass -> css
-------------------- */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    buffer = require('vinyl-buffer'),
    make = require('../config').make,
    paths = require('../config').base;

gulp.task('sass', function () {
  var srcPath = [],
      dstPath = [],
      prdPath = [],
      forNum = 0;
  if(make.device.length){
    for(var i = 0; i < make.device.length; i++) {
      srcPath.push(paths.srcDir + '/theme/' + make.device[i] + '/sass/**/*.scss');
      dstPath.push(paths.dstDir + '/theme/' + make.device[i] + '/css/');
      prdPath.push(paths.prdDir + '-' + make.device[i] + '/css/');
    }
    forNum = make.device.length;
  } else {
    srcPath.push(paths.srcDir + '/sass/**/*.scss');
    dstPath.push(paths.dstDir + '/css/');
    prdPath.push(paths.prdDir + '/css/');
    forNum = 1;
  }

  for(var i = 0; i < forNum; i++) {
    gulp.src([srcPath[i]])
      .pipe($.sourcemaps.init())
      .pipe($.plumber())
      .pipe($.sassBulkImport())
      .pipe($.sass())
      
      .pipe($.pleeease({
      fallbacks: {
        autoprefixer: ['ie 9']
      }
    }))
      .pipe(buffer())
      .pipe($.sourcemaps.write('../maps'))
      .pipe(gulp.dest(prdPath[i]))
      .pipe(gulp.dest(dstPath[i]));

    gulp.src([paths.srcDir + '/fonts/**/*.*'],{base: paths.srcDir})
      .pipe(gulp.dest(paths.dstDir + '/css/'))
      .pipe(gulp.dest(paths.prdDir + '/css/'))
      .pipe(gulp.dest(paths.sgDir + '/'));
  }
});