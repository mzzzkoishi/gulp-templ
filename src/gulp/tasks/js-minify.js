/* --------------------
// js-minify
-------------------- */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babelify = require("babelify"),
    paths = require('../config').base,
    make = require('../config').make,
    use = require('../config').use;

gulp.task('js-minify', function(){
  var srcPath = [],
      dstPath = [],
      prdPath = [],
      sgPath = [],
      forNum = 0;
  if(make.device.length){
    for(var i = 0; i < make.device.length; i++) {
      srcPath.push(paths.srcDir + '/theme/' + make.device[i] + '/js/script.js');
      dstPath.push(paths.dstDir + '/theme/' + make.device[i] + '/js');
      prdPath.push(paths.prdDir + '-' + make.device[i] + '/js/');
      sgPath.push(paths.sgDir + '-' + make.device[i] + '/js/');
    }
    forNum = make.device.length;
  } else {
    srcPath.push(paths.srcDir + '/js/script.js');
    dstPath.push(paths.dstDir + '/js/');
    prdPath.push(paths.prdDir + '/js/');
    sgPath.push(paths.sgDir + '/js/');
    forNum = 1;
  }
  for(var i = 0; i < forNum; i++) {
    if(use.es6){
      browserify({
        entries: [srcPath[i]],
        transform: ['babelify']
      })
        .bundle()
        .on('error', function(err){
        console.log(err.message);
        console.log(err.stack);
      })
        .pipe(source('build.js'))
        .pipe(buffer())
        .pipe($.babel({compact: true,comments:false,minified: true,presets: ['es2015']}))
        .pipe(gulp.dest(dstPath[i]))
        .pipe(gulp.dest(prdPath[i]))
        .pipe($.if(use.styleguide,gulp.dest(sgPath[i])))
      ;
    } else {
      browserify({
        entries: [srcPath[i]]
      })
        .bundle()
        .pipe(source('build.js'))
        .pipe(buffer())
        .pipe($.uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
        .pipe(gulp.dest(dstPath[i]))
        .pipe(gulp.dest(prdPath[i]))
        .pipe($.if(use.styleguide,gulp.dest(sgPath[i])))
      ;
    }
  }
});