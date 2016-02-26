/** Gulp file for tasks */

var paths = {
	templates: './templates',
	sass: 'css/source'
};

var gulp = require('gulp');
var path = require('path');
var rename = require('gulp-rename');
var fileinclude = require('gulp-file-include');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('fileinclude', function() {
	return gulp.src(path.join(paths.templates, '*.tpl.html'))
		.pipe(fileinclude())
		.pipe(rename({
			extname: ""
		}))
		.pipe(rename({
			extname: ".html"
		}))
		.pipe(gulp.dest('./'));
});