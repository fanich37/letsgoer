import gulp from 'gulp';
import watch from 'gulp-watch';
import bSync from 'browser-sync';
import runSequence from 'run-sequence';

const bs = bSync.create();

gulp.task('watch', () => {
	global.watch = true;

	watch('src/resources/**/*', () => runSequence('copy', bs.reload));
	watch('src/{styles,blocks}/**/*.styl', () => { runSequence(['styles', 'styles:lint'], () => bs.reload('assets/styles/main.min.css')) });
	watch('src/icons/**/*.svg', () => runSequence('icons', bs.reload));
	watch('src/{pages,blocks}/**/*.pug', () => runSequence('templates', bs.reload))
		.on('all', (event, filepath) => {
			global.emittyChangedFile = filepath;
		});
	watch('src/scripts/vendor/*.js', () => runSequence('scripts:vendor', bs.reload));
});
