/* --------------------
// sprite image
-------------------- */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    make = require('../config').make,
    use = require('../config').use,
    paths = require('../config').base;

gulp.task('sprite', function () {
  var srcPath = [],
      dstPath = [],
      prdPath = [],
      sgPath = [],
      srcSharedPath;
  if(make.device.length){
    for(var i = 0; i < make.device.length; i++) {
      srcSharedPath = paths.srcDir + '/theme/shared/img/sprite/*.png';
      dstPath.push(paths.dstDir + '/theme/' + make.device[i] + '/img/');
      prdPath.push(paths.prdDir + '-' + make.device[i] + '/img/');
      sgPath.push(paths.sgDir + '-' + make.device[i] + '/img/');
    }
  } else {
    srcPath = paths.srcDir + '/img/sprite/*.png';
    dstPath = paths.dstDir + '/img/';
    prdPath = paths.prdDir + '/img/';
    sgPath = paths.sgDir + '/img/';
  }

  if(make.device.length){
    var spriteData = gulp.src(srcSharedPath)
    .pipe($.spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
      imgPath: '../img/sprite.png',
      cssFormat: 'scss',
      padding: 10,
      algorithm: 'binary-tree',
      cssVarMap: function (sprite) {
        sprite.name = sprite.name;
      }
    }));
    for(var i = 0; i < make.device.length; i++) {
      spriteData.img.pipe(gulp.dest(dstPath[i]));
      spriteData.img.pipe($.if(use.styleguide,gulp.dest(sgPath[i])));
      spriteData.img.pipe(gulp.dest(prdPath[i]));
      spriteData.css.pipe(gulp.dest(paths.srcDir + '/theme/' + make.device[i] + '/sass/'));
    }
  } else {
    var spriteData = gulp.src(srcPath)
    .pipe($.spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
      imgPath: '../img/sprite.png',
      cssFormat: 'scss',
      padding: 10,
      algorithm: 'binary-tree',
      cssVarMap: function (sprite) {
        sprite.name = sprite.name;
      }
    }));
    spriteData.img.pipe(gulp.dest(dstPath));
    spriteData.img.pipe($.if(use.styleguide,gulp.dest(sgPath[i])));
    spriteData.img.pipe(gulp.dest(prdPath));
    spriteData.css.pipe(gulp.dest(paths.srcDir + '/sass/'));
  }
  
});