import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('default', () => (
	runSequence(
		[
			'icons',
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
		'icons',
		'styles',
		'scripts:jquery',
		'scripts',
		'copy',
		'templates'
	)
));