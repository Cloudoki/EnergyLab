var jsonminify = require('gulp-jsonminify');

module.exports = function() {

	gulp.src( ENV_MODE.path + '/templates/**/*.json')
        .pipe(jsonminify())
        .pipe(gulp.dest(ENV_MODE.dest + '/templates'));
};