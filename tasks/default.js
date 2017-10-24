const runSequence = require('run-sequence');
const gulp = require('gulp');

gulp.task('default', () => (
	runSequence(
		'styles',
		'templates',
		'scripts',
		'server',
		'watch'
	)
));