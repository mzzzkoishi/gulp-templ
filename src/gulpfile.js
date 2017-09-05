var gulp = require('gulp'),
    requireDir = require('require-dir');

requireDir('./gulp/tasks', {recurse: true});

/* --------------------
// $gulp styleguide
-------------------- */
gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

/* --------------------
// $gulp build
-------------------- */
gulp.task('build',['imgmin','sass','tmpl','js-minify']);

/* --------------------
// $gulp 
-------------------- */
gulp.task('default', ['watch','connect']);