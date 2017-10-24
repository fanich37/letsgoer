const gulp = require('gulp');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const pugLinter = require('gulp-pug-linter');
const prettify = require('gulp-jsbeautifier');
const inheritance = require('gulp-pug-inheritance');
// const emitty = require('emitty').setup('app', 'pug');
const cached = require('gulp-cached');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const errorHandler = require('gulp-plumber-error-handler');
const staticHash = require('gulp-static-hash');

gulp.task('templates', () => (
	gulp.src('app/**/*.pug')
		.pipe(plumber({errorHandler: errorHandler(`Error in \'templates\' task`)}))
		// .pipe(cached('pug-template'))
		.pipe(gulpIf(global.watch, inheritance({basedir: 'app', skip: 'node_modules'})))
		// .pipe(gulpIf(global.watch, emitty.stream()))
		.pipe(filter(file => /app[\\\/]pages/.test(file.path)))
		.pipe(pug({basedir: 'app'}))
		.pipe(gulpIf(process.env.PRETTIFY !== false, prettify({
			braceStyle: 'expand',
			indentWithTabs: true,
			indentInnerHtml: true,
			preserveNewlines: true,
			endWithNewline: true,
			wrapLineLength: 120,
			maxPreserveNewlines: 50,
			wrapAttributesIndentSize: 1,
			unformatted: ['use']
		})))
		.pipe(gulpIf(process.env.NODE_ENV === 'production', staticHash({
			asset: 'dist',
			exts: ['js', 'css']
		})))
		.pipe(rename({dirname: '.'}))
		.pipe(gulp.dest('dist'))
));

gulp.task('templates:lint', () =>
	gulp
		.src('app/**/*.pug')
		.pipe(pugLinter())
		.pipe(pugLinter.reporter('fail'))
);