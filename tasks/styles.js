const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const stylint = require('gulp-stylint');
const stylus = require('gulp-stylus');
// const importIfExist = require('stylus-import-if-exist');
const autoprefixer = require('autoprefixer-stylus');
const gcmq = require('gulp-group-css-media-queries');
const nano = require('gulp-cssnano');
const rename = require('gulp-rename');
const errorHandler = require('gulp-plumber-error-handler');

const isDebug = process.env.NODE_ENV !== 'production';

gulp.task('styles', () => (
	gulp.src('app/styles/*.styl')
		.pipe(plumber({errorHandler: errorHandler(`Error in \'styles\' task`)}))
		.pipe(stylus({
			use: [
				// importIfExist(),
				autoprefixer()
			],
			'include css': true
		}))
		.pipe(gulpIf(!isDebug, gcmq()))
		.pipe(gulpIf(!isDebug, nano({zindex: false})))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/assets/styles'))
));

gulp.task('styles:lint', () => (
	gulp.src(['app/**/*.styl', '!app/styles/**'])
		.pipe(stylint({
			reporter: 'stylint-stylish',
			reporterOptions: {verbose: true}
		}))
		.pipe(stylint.reporter())
		.pipe(stylint.reporter('fail', {failOnWarning: true}))
));