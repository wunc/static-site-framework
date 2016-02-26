/** Gulp file for tasks */

var paths = {
	templates: './templates',
	sass: 'css/source',
	css: 'css',
	js: 'js',
	bootstrapjs: 'vendor/bower_components/bootstrap-sass/assets/javascripts',
	jquery: 'vendor/bower_components/jquery/dist'
};

var gulp = require('gulp');
var rename = require('gulp-rename');
var fileinclude = require('gulp-file-include');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('html', function() {
	return gulp.src(paths.templates + '/*.tpl.html')
		.pipe(fileinclude())
		.pipe(rename({
			extname: ""
		}))
		.pipe(rename({
			extname: ".html"
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('css', function() {
	return sass(paths.sass + '/style.scss', {
			style: 'compressed',
			sourcemap: true,
			cacheLocation: '/tmp/sass-cache'
		})
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.css));
});

gulp.task('copy_bootstrapjs', function() {
	return gulp.src(paths.bootstrapjs + '/bootstrap.min.js')
		.pipe(gulp.dest(paths.js));
});

gulp.task('copy_jquery', function() {
	return gulp.src(paths.jquery + '/jquery.min.js')
		.pipe(gulp.dest(paths.js));
});

// Copy stuff
gulp.task('copy', ['copy_bootstrapjs', 'copy_jquery']);

// Watch
gulp.task('watch', function() {
     gulp.watch(paths.sass + '/**/*.scss', ['css']); 
	gulp.watch(paths.templates + '/**/*.html', ['html']); 
});

// Default
  gulp.task('default', ['html', 'css']);
