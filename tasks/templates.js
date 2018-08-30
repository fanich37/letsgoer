import gulp from 'gulp';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import pugLinter from 'gulp-pug-linter';
import prettify from 'gulp-jsbeautifier';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import errorHandler from 'gulp-plumber-error-handler';
import staticHash from 'gulp-static-hash';
import changed from 'gulp-changed';

const emitty = require('emitty').setup('src/blocks', 'pug');

gulp.task('templates', () => {
  new Promise((resolve, reject) => {
    emitty.scan(global.emittyChangedFile).then(() => {
      gulp
        .src('src/**/*.pug')
        .pipe(plumber({errorHandler: errorHandler('Error in \'templates\' task')}))
        .pipe(changed('dist', {extension: '.html'}))
        .pipe(filter(file => /src[\\\/]pages/.test(file.path)))
        .pipe(pug({basedir: 'src'}))
        .pipe(
          gulpIf(
            process.env.PRETTIFY !== false,
            prettify({
              braceStyle: 'expand',
              indentWithTabs: true,
              indentInnerHtml: true,
              preserveNewlines: true,
              endWithNewline: true,
              wrapLineLength: 120,
              maxPreserveNewlines: 50,
              wrapAttributesIndentSize: 1,
              unformatted: ['use']
            })
          )
        )
        .pipe(
          gulpIf(
            process.env.NODE_ENV === 'production',
            staticHash({
              asset: 'dist',
              exts: ['js', 'css']
            })
          )
        )
        .pipe(rename({dirname: '.'}))
        .pipe(gulp.dest('dist'))
        .on('end', resolve)
        .on('error', reject);
    });
  });
});

gulp.task('templates:lint', () =>
  gulp
    .src('src/**/*.pug')
    .pipe(pugLinter())
    .pipe(pugLinter.reporter('fail'))
);
