const gulp = require('gulp');
const changed = require('gulp-changed');
const filter = require('gulp-filter');
const gulpIf = require('gulp-if');

const { INCLUDE_ROBOTS } = process.env;

gulp.task('copy', () => (
	gulp.src('app/resources/**/*')
		.pipe(changed('dist'))
		.pipe(gulpIf(!INCLUDE_ROBOTS, filter(file => !/resources[\\\/]robots\.txt/.test(file.path))))
		.pipe(gulp.dest('dist'))
));