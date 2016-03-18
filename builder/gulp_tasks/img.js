module.exports = function() {

    return gulp.src( ENV_MODE.path + '/img/**/*' )
        .pipe(gulp.dest(ENV_MODE.dest + '/img'));
};