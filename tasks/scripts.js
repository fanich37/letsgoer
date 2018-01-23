import gulp from 'gulp';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';
import babel from 'babelify';
import browserify from 'browserify';
import errorHandler from 'gulp-plumber-error-handler';

const isDebug = process.env.NODE_ENV !== 'production';

const sourceFolder = 'app/scripts/';
const postfix = '.js';
const filesToBundle = ['app', 'details'];

gulp.task('scripts', () => {
	filesToBundle.forEach(item => {
		let bundler = browserify(`${sourceFolder}${item}${postfix}`, {debug: true}).transform(babel);
		return bundler
			.bundle()
			.on('error', function(err) {console.error(err); this.emit('end');})
			.pipe(source(`${item}.min${postfix}`))
			.pipe(buffer())
			.pipe(gulpIf(!isDebug, uglify()))
			.pipe(gulp.dest('dist/assets/scripts'));
	});
});

gulp.task('scripts:lint', () => {
	filesToBundle.forEach(item => {
		gulp.src(`${sourceFolder}${item}${postfix}`)
			.pipe(plumber({errorHandler: errorHandler(`Error in \'scripts\' task`)}))
			.pipe(eslint())
			.pipe(eslint.format());
	});
});

gulp.task('scripts:libraries', () => {
	gulp.src('app/scripts/libraries/*.js')
		.pipe(gulp.dest('dist/assets/scripts'));
});
