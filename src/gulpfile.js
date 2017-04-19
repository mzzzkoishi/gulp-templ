var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sass = require('gulp-sass'),
    bulkSass = require('gulp-sass-bulk-import'),
    pleeease = require('gulp-pleeease'),
    spritesmith = require('gulp.spritesmith'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    chmod = require('gulp-chmod'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    header = require('gulp-header'),
    connect = require('gulp-connect'),
    ejs = require('gulp-ejs'),
    fs = require('fs'),
    rename = require('gulp-rename'),
    minimist = require("minimist");

var paths = {
  srcDir : 'assets/',
  dstDir : '../dist/assets/'
};

/* --------------------
// ejs -> html
-------------------- */
gulp.task('ejs', function() {
  var data = JSON.parse(fs.readFileSync("themes/shared/json/data.json")),
      pages = JSON.parse(fs.readFileSync("themes/shared/json/pages.json"));
   
  gulp.src([paths.srcDir + 'ejs/*.ejs'])
    .pipe(plumber())
    .pipe(ejs())
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest(paths.dstDir))
    .pipe(connect.reload());

});


/* --------------------
// imgmin
-------------------- */
gulp.task( 'imgmin', function(){
  var imageminOptions = {
    optimizationLevel: 7
  };
  gulp.src([paths.srcDir + 'img/*.+(jpg|jpeg|png|svg)'])
    .pipe(imagemin(imageminOptions))
    .pipe(chmod(644))
    .pipe(gulp.dest(paths.dstDir + 'img/'))
    .pipe(connect.reload());
});

/* --------------------
// sass -> css
-------------------- */
gulp.task('sass', function () {

  gulp.src([paths.srcDir + 'sass/**/*.scss'])
    .pipe(plumber())
    .pipe(bulkSass())
    .pipe(sass())
    .pipe(pleeease({
      fallbacks: {
        autoprefixer: ['ie 9']
      }
    }))
    .pipe(buffer())
    .pipe(gulp.dest(paths.dstDir + 'css/'));
  
  gulp.src([paths.srcDir + 'fonts/**/*.*'],{base: paths.srcDir})
    .pipe(gulp.dest(paths.dstDir + 'css/'));
});


/* --------------------
// sprite image
-------------------- */
gulp.task('sprite', function () {
  var spriteData = gulp.src(paths.srcDir + 'img/sprite/*.png')
  .pipe(spritesmith({
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
  
  spriteData.img.pipe(gulp.dest(paths.dstDir + 'img/'));
  spriteData.css.pipe(gulp.dest(paths.srcDir + 'sass/'));
});

/* --------------------
// js-minify
-------------------- */
gulp.task('js-minify', function(){
    
  browserify({
    entries: [paths.srcDir + 'js/script.js']
  })
    .bundle()
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(uglify().on('error', function(e) { console.log('\x07',e.message); return this.end(); }))
    .pipe(gulp.dest(paths.dstDir + 'js'));
  
});


/* --------------------
// $gulp watch
-------------------- */
gulp.task('watch',function(){
  gulp.watch(paths.srcDir + 'sass/**/*.scss', ['sass']);
  gulp.watch(paths.srcDir + 'js/**/*.js', ['js-minify']);
  gulp.watch(paths.srcDir + 'ejs/**/*.ejs', ['ejs']);
});

gulp.task('connect', function() {
  connect.server({
    root: [__dirname + '/dist/'],
    port: 8700,
    livereload: true
  });
});

/* --------------------
// $gulp 
-------------------- */
gulp.task('default', ['watch','connect']);