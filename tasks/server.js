import gulp from 'gulp';
import debuga from 'debuga';
import bSync from 'browser-sync';

const bs = bSync.create();
const {PORT, OPEN, NODE_ENV, TUNNEL} = process.env;

gulp.task('server', () =>
  bs.init({
    watchOptions: {
      ignored: 'src/**/*'
    },
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
      baseDir: ['src', 'dist'],
      directory: false,
      middleware: NODE_ENV !== 'production' ? [debuga()] : []
    },
    tunnel: !!TUNNEL
  })
);
