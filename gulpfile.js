/** Gulp file for tasks */

var paths = {
	templates: './templates',
	sass: 'css/source',
	css: 'css'
};

var gulp = require('gulp');
var rename = require('gulp-rename');
var fileinclude = require('gulp-file-include');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('fileinclude', function() {
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

gulp.task('sass', function() {
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