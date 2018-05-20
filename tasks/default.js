import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('default', () => (
	runSequence(
		[
			'icons',
			'copy',
			'styles',
			'scripts:vendor',
			'scripts',
			'templates'
		],
		'server',
		'watch'
	)
));

gulp.task('build', () => (
	runSequence(
		'icons',
		'copy',
		'styles',
		'scripts:vendor',
		'scripts',
		'templates'
	)
));