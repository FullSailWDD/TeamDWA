var gulp 			= require('gulp'),
	child_process 	= require('child_process'),
	jeet 			= require('jeet'),
	nodemon 		= require('gulp-nodemon'),
	browserSync 	= require('browser-sync'),
	stylus 			= require('gulp-stylus'),
	connect 		= require ('gulp-connect'),
	connect         = require('gulp-connect'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    ngAnnotate      = require('gulp-ng-annotate'),
    htmlmin         = require('gulp-html-minifier'),
    livereload      = require('gulp-livereload');

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

	gulp.task('htmlCompress', function () {
    gulp.src('./app/views/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./public/views'));
	});


	gulp.task('jsCompress', function () {
    gulp.src('./app/js/**/*.js')
        //.pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(gulp.dest('./public/js/build'))
        .pipe(livereload())
        //.on('error', gutil.log);
	});

	gulp.task('watch', function () {
    livereload.listen();
    gulp.watch([        
        './app/**/*', 
        './routes/**/*',
        './models/**/*'
    ],['all']);
	});

	gulp.task('all', ['mongod', 'dev', 'htmlCompress', 'jsCompress', 'watch']);