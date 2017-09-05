/* --------------------
// imgmin
-------------------- */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    make = require('../config').make,
    use = require('../config').use,
    paths = require('../config').base;

gulp.task( 'imgmin', function(){
  var srcPath = [],
      dstPath = [],
      prdPath = [],
      sgPath = [],
      srcSharedPath,
      forNum = 0;
  
  if(make.device.length){
    for(var i = 0; i < make.device.length; i++) {
      srcPath.push(paths.srcDir + '/theme/' + make.device[i] + '/img/*.+(jpg|jpeg|png|svg|gif)');
      dstPath.push(paths.dstDir + '/theme/' + make.device[i] + '/img/');
      prdPath.push(paths.prdDir + '-' + make.device[i] + '/img/');
      sgPath.push(paths.sgDir + '-' + make.device[i] + '/img/');
    }
    srcSharedPath = paths.srcDir + '/theme/shared/img/*.+(jpg|jpeg|png|svg|gif)';
    forNum = make.device.length;
  } else {
    srcPath.push(paths.srcDir + '/img/*.+(jpg|jpeg|png|svg|gif)');
    dstPath.push(paths.dstDir + '/img/');
    prdPath.push(paths.prdDir + '/img/');
    sgPath.push(paths.sgDir + '/img/');
    forNum = 1;
  }
  
  var imageminOptions = {
    optimizationLevel: 8
  };
  for(var i = 0; i < forNum; i++) {
    gulp.src( srcPath[i] )
      .pipe($.imagemin( imageminOptions ))
      .pipe($.chmod(644))
      .pipe(gulp.dest( dstPath[i] ))
      .pipe(gulp.dest( prdPath[i] ))
      .pipe($.if(use.styleguide,gulp.dest(sgPath[i])))
      .pipe($.connect.reload());
    if(make.device.length){
      gulp.src( srcSharedPath )
        .pipe($.imagemin( imageminOptions ))
        .pipe($.chmod(644))
        .pipe(gulp.dest( dstPath[i] ))
        .pipe(gulp.dest( prdPath[i] ))
        .pipe($.if(use.styleguide,gulp.dest(sgPath[i])))
        .pipe($.connect.reload());
    }
  }
});