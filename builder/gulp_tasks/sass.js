var sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename');

module.exports = function(done) {

  return gulp.src( ENV_MODE.path + '/css/style.scss' )
    .pipe(sass())
    .pipe(gulp.dest(ENV_MODE.dest + '/css'));
};
