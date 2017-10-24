const gulp = require('gulp');
const bs = require('browser-sync').create();
const debuga = require('debuga');

const { PORT, OPEN, NODE_ENV, TUNNEL } = process.env;

gulp.task('server', () => (
	bs.init({
		// watchOptions: {
		// 	ignored: 'app/**/*'
		// },
		files: ['dist/**/*'],
		open: !!OPEN,
		reloadOnRestart: true,
		port: PORT || 3000,
		snippetOptions: {
			rule: {
				match: /<\/body>/i
			}
		},
		server: {
			baseDir: [
				'app',
				'dist'
			],
			directory: false,
			middleware: NODE_ENV !== 'production' ? [debuga()] : []
		},
		tunnel: !!TUNNEL
	})
));