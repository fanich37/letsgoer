import gulp from 'gulp';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import browserify from 'browserify';
import errorHandler from 'gulp-plumber-error-handler';

const isDebug = process.env.NODE_ENV !== 'production';

gulp.task('scripts', () => {
	let bundler = browserify('app/scripts/app.js', {debug: true});
	return bundler
		.bundle()
		.on('error', function(err) {console.error(err); this.emit('end');})
		.pipe(source('app.min.js'))
		.pipe(buffer())
		.pipe(gulpIf(!isDebug, uglify()))
		.pipe(gulp.dest('dist/assets/scripts'));
});

gulp.task('scripts:lint', () => {
	gulp.src(['app/scripts/**/*.js', '!app/scripts/jquery.min.js'])
		.pipe(plumber({errorHandler: errorHandler(`Error in \'scripts\' task`)}))
		.pipe(eslint())
		.pipe(eslint.format());
});

// gulp.task('scripts', () => {
// 	gulp.src('app/scripts/app.js')
// 		.pipe(plumber({errorHandler: errorHandler(`Error in \'scripts\' task`)}))
// 		.pipe(eslint())
// 		.pipe(eslint.format())
// 		.pipe(babel())
// 		// .pipe(gulpif(!isDebug, concat('scripts.js')))
// 		.pipe(gulpIf(!isDebug, uglify()))
// 		.pipe(rename({suffix: '.min'}))
// 		.pipe(gulp.dest('dist/assets/scripts'))
// });

gulp.task('scripts:jquery', () => {
	gulp.src('app/scripts/jquery.min.js')
		.pipe(gulp.dest('dist/assets/scripts'));
})