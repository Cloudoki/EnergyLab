module.exports = function() {

    return gulp.src( ENV_MODE.path + '/fonts/**/*' )
        .pipe(gulp.dest(ENV_MODE.dest + '/fonts'));
};