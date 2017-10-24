const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const errorHandler = require('gulp-plumber-error-handler');

const isDebug = process.env.NODE_ENV !== 'production';

gulp.task('scripts', () => {
	gulp.src('app/scripts/*.js')
		.pipe(plumber({errorHandler: errorHandler(`Error in \'scripts\' task`)}))
		.pipe(gulpif(!isDebug, uglify()))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/assets/scripts'));
});