var rimraf = require("gulp-rimraf"),
    ignore = require('gulp-ignore');

module.exports = function() {

  return gulp.src(ENV_MODE.dest + '/**/*.*', {read: false})
    .pipe(ignore('lib/**'))
    .pipe(rimraf({force: true}));
};
