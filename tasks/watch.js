const gulp = require('gulp');
const watch = require('gulp-watch');
const bs = require('browser-sync').create();
const runSequence = require('run-sequence');

gulp.task('watch', () => {
	global.watch = true;

	watch('app/{styles,blocks}/**/*.styl', () => { runSequence(['styles', 'styles:lint'], () => bs.reload('assets/styles/app.min.css')) });
	watch('app/{pages,blocks}/**/*.pug', () => runSequence(['templates'], bs.reload));
	watch('app/scripts/**/*.js', () => runSequence(['scripts'], bs.reload));
});