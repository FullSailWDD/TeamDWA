var gulp = require('gulp'),
	child_process = require('child_process'),
	jeet = require('jeet'),
	nodemon = require('gulp-nodemon'),
	browserSync = require('browser-sync'),
	stylus = require('gulp-stylus'),
	connect = require ('gulp-connect');



	gulp.task('dev', function(){
		nodemon({
			script: 'app.js',
			ext: 'js handlebars'
		})
	})

	gulp.task('mongod', function(){
		child_process.exec('mongo', function(err, stdout, stderr){
			console.log(stdout);		
		})
	})

	gulp.task('browser-sync', function(){
		browserSync({
			server: {
				baseDir: '/dashboard'
			}
		})
	})

	gulp.task('all', ['mongod', 'dev']);

	gulp.task('test', function(){

	})
