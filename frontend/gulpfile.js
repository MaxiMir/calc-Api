const gulp = require('gulp');
const ts = require('gulp-typescript');
const minify = require('gulp-minify');

const tsProject = ts.createProject('tsconfig.json');

const prepareTsToJs = () => {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(minify({noSource: true}))
    .pipe(gulp.dest('./'));
};

gulp.task('build', prepareTsToJs);

gulp.task('watch', () => gulp.watch('src/**/**.ts', prepareTsToJs));