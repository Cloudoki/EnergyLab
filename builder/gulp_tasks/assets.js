module.exports = function() {

    return gulp.src( ENV_MODE.path + '/assets/**/*' )
        .pipe(gulp.dest(ENV_MODE.dest + '/assets'));
};
