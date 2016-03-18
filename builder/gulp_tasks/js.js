var concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

module.exports = function() {

	gulp.src( ENV_MODE.path + '/config.js' )
      .pipe(gulp.dest(ENV_MODE.dest));

  gulp.src( [ENV_MODE.path + '/js/**/*.js', '!' + ENV_MODE.path + '/js/vendor/**/*'] )
      .pipe(gulp.dest(ENV_MODE.dest + '/js'));

  gulp.src( ENV_MODE.path + '/js/vendor/**/*.js' )
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(ENV_MODE.dest + '/js/vendor'));
};
