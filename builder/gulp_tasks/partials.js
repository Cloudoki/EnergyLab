module.exports = function() {

    return gulp.src( ENV_MODE.path + '/partials/**/*' )
        .pipe(gulp.dest(ENV_MODE.dest + '/partials'));
};