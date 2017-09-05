/* --------------------
// styleguide
-------------------- */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    styleguide = require('sc5-styleguide'),
    paths = require('../config').base,
    ports = require('../config').ports,
    use = require('../config').use,
    make = require('../config').make,
    minimist = require("minimist"),
    env = minimist(process.argv.slice(2)),
    appRoot = [],
    srcPath = [],
    sgPath = [],
    staticFlg,
    forNum = 0;

if(env.server) {
  if(make.device.length){
    for(var i = 0; i < make.device.length; i++) {
      appRoot.push('/styleguide-' + make.device[i] + '/');
    }
  } else {
    appRoot.push('/styleguide/');
  }
  staticFlg = true;
} else {
  appRoot = '';
  staticFlg = false;
}

if(make.device.length){
  for(var i = 0; i < make.device.length; i++) {
    srcPath.push(paths.srcDir + '/theme/' + make.device[i] + '/sass/**/*.scss');
    sgPath.push(paths.sgDir + '-' + make.device[i]);
  }
  forNum = make.device.length;
} else {
  srcPath.push(paths.srcDir + '/sass/**/*.scss');
  sgPath.push(paths.sgDir);
  forNum = 1;
}


gulp.task('styleguide:generate', function () {
  if(!use.styleguide) {
    console.log('--- styleguide is unused.');
    return;
  }
  
  for(var i = 0; i < forNum; i++) {
    gulp.src(srcPath[i])
      .pipe($.plumber())
      .pipe(styleguide.generate({
        title: 'Sheis Styleguide',
        server: true,
        port: ports.styleguide + (10 * i),
        rootPath: sgPath[i],
        overviewPath: paths.srcDir + '/sass/overview.md',
        afterBody: [
          '<script src="' + appRoot[i] + '/js/build.js"></script>'
        ],
        disableEncapsulation: true,
        disableHtml5Mode: staticFlg,
        appRoot: appRoot[i]
      }))
      .pipe(gulp.dest(sgPath[i]));
  }
});

gulp.task('styleguide:applystyles', function () {
  if(!use.styleguide) {
    console.log('--- styleguide is unused.');
    return;
  }

  for(var i = 0; i < forNum; i++) {
    gulp.src(srcPath[i])
      .pipe($.plumber())
      .pipe($.sassBulkImport())
      .pipe($.sass({
        errLogToConsole: true
      }))
      .pipe(styleguide.applyStyles())
      .pipe(gulp.dest(sgPath[i]));
  }
});