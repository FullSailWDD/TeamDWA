'use strict';

var 
    gulp            = require('gulp'),
    child_process   = require('child_process'),
    nodemon         = require('gulp-nodemon'),
//    jeet            = require('jeet'),
//    stylus          = require('gulp-stylus'),
//    connect         = require('gulp-connect');
    

// include, if you want to work with sourcemaps 
//var sourcemaps = require('gulp-sourcemaps');

// startup required services to run the app server
gulp.task('mongod', function() {
    // spawn in a child process mongodb
    child_process.exec('mongod', function(err,stdout,stderr){
    	console.log(stdout);
    });
});

gulp.task('dev', function () {
  nodemon({ script: 'app.js'
          , ext: 'html js styl'
          , ignore: ['ignored.js'] })
    .on('restart', function () {
      console.log('restarted!')
    })
});




// Get one .styl file and render 
//gulp.task('stylus', function () {
//  gulp.src('./assets/css/main.styl')
//    .pipe(stylus(
//      {use: [jeet()]}
//    ))
//    .pipe(gulp.dest('./public/css/build'))
//    .pipe(connect.reload());
//});
 

//gulp.task('watch', function () {
//  // gulp.watch(['./app/*.html'], ['html']);
//  gulp.watch(['./assets/css/*.styl'], ['stylus']);
//});





// Options 
// Options compress 
//gulp.task('compress', function () {
//  gulp.src('./css/compressed.styl')
//    .pipe(stylus({
//      compress: true
//    }))
//    .pipe(gulp.dest('./css/build'));
//});
 
 
// Set linenos 
//gulp.task('linenos', function () {
//  gulp.src('./css/linenos.styl')
//    .pipe(stylus({linenos: true}))
//    .pipe(gulp.dest('./css/build'));
//});
 
// Include css 
// Stylus has an awkward and perplexing 'incude css' option 
//gulp.task('include-css', function() {
//  gulp.src('./css/*.styl')
//    .pipe(stylus({
//      'include css': true
//    }))
//    .pipe(gulp.dest('./'));
// 
//});
 
// Inline sourcemaps 
//gulp.task('sourcemaps-inline', function () {
//  gulp.src('./css/sourcemaps-inline.styl')
//    .pipe(sourcemaps.init())
//    .pipe(stylus())
//    .pipe(sourcemaps.write())
//    .pipe(gulp.dest('./css/build'));
//});
 
// External sourcemaps 
//gulp.task('sourcemaps-external', function () {
//  gulp.src('./css/sourcemaps-external.styl')
//    .pipe(sourcemaps.init())
//    .pipe(stylus())
//    .pipe(sourcemaps.write('.'))
//    .pipe(gulp.dest('./css/build'));
//});
 
gulp.task('build', ['mongod', 'dev']);