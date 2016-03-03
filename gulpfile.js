var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var inlineCss = require('gulp-inline-css');
var browserSync = require('browser-sync').create();

gulp.task('default', gulpsync.sync(['styles', 'inline-css']), function() {
	browserSync.init({
		server: 'build'
	});
	gulp.watch('src/styles/**/*.scss', gulpsync.sync(['inline-css', 'styles']));
	gulp.watch('src/index.html', ['inline-css']);

	gulp.watch('build/index.html').on('change', browserSync.reload);
});

gulp.task('inline-css', function() {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('build'))
		.pipe(inlineCss({
			applyStyleTags: true,
			applyLinkTags: true,
			removeStyleTags: true,
			removeLinkTags: true
        }))
		.pipe(gulp.dest('build/'));
});

gulp.task('styles', function() {
	return gulp.src('src/styles/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('build/'))
		.pipe(browserSync.stream());
});