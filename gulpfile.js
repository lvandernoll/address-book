const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

gulp.task('sass', () => {
	return gulp.src('sass/index.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});

gulp.task('minify-css', () => {
	return gulp.src('css/index.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('css'));
});

gulp.task('minify-js', function() {
	gulp.src(['dist/app-concat.js'])
	.pipe(minify())
	.pipe(gulp.dest('dist'))
});

gulp.task('concat-js', function() {
	return gulp.src('js/**/*.js')
	.pipe(concat('app-concat.js'))
	.pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: ""
	});

	gulp.watch("sass/**/*.scss", ['sass']);
	gulp.watch("css/index.css", ['minify-css']);
	gulp.watch("js/**/*.js", ['concat-js']);
	gulp.watch("dist/app-concat.js", ['minify-js']).on('change', browserSync.reload);
	gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'browser-sync']);
