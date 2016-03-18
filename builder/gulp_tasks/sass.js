var sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename');

module.exports = function(done) {

  gulp.src(PATHS.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(ENV_MODE.dest + '/css'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(ENV_MODE.dest + '/css'))
    .on('end', done);
};
