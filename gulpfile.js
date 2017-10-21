'use strict';

const gulp     = require('gulp');
const path     = require('path');
const rename   = require('gulp-rename');
const template = require('gulp-template');
const yargs    = require('yargs');

let resolveToComponents = (glob = '') => {
  return path.join('app/components', glob); // app/components/{glob}
};

const blankTemplates = path.join(__dirname, 'template', 'component/**/*.**');

gulp.task('component', () => {
  const cap = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1);
  };
  const name = yargs.argv.name;
  const parentPath = yargs.argv.parent || '';
  const destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(blankTemplates)
    .pipe(template({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});