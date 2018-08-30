import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import setWebpackConfig from '../webpack.config.js';

const NODE_ENV = process.env;
const isDebug = process.env.NODE_ENV !== 'production';

gulp.task('scripts', () => {
  gulp
    .src('src/scripts/bundle.js')
    .pipe(
      webpackStream(
        setWebpackConfig({
          watch: isDebug,
          debug: isDebug,
          sourcemaps: isDebug
        })
      )
    )
    .pipe(gulp.dest('dist/assets/scripts'));
});

gulp.task('scripts:vendor', () => {
  gulp.src('src/scripts/vendor/*.js').pipe(gulp.dest('dist/assets/scripts/vendor'));
});
