import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('default', () => (
	runSequence(
		[
			'styles',
			'templates',
			'scripts:jquery',
			'scripts:lint',
			'scripts'
		],
		'server',
		'watch'
	)
));

gulp.task('build', () => (
	runSequence(
		'styles',
		'scripts:jquery',
		'scripts',
		'copy',
		'templates'
	)
));