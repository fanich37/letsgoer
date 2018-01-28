import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import setWebpackConfig from '../webpack.config.js';

const NODE_ENV = process.env;
const isDebug = process.env.NODE_ENV !== 'production';

const filesToServe = {
	app: './app/scripts/app.js', 
	details: './app/scripts/details.js'
};

gulp.task('scripts', () => {
	gulp.src('app/scripts/app.js')
		.pipe(webpackStream(setWebpackConfig({
			watch: isDebug,
			debug: isDebug,
			sourcemaps: isDebug
		}, filesToServe)))
		.pipe(gulp.dest('dist/assets/scripts'));
});

gulp.task('scripts:libs', () => {
	gulp.src('app/scripts/external-libs/*.js')
		.pipe(gulp.dest('dist/assets/scripts'));
});