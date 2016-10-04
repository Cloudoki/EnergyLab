module.exports = function() {

    return gulp.src( ENV_MODE.path + '/license/**/*' )
        .pipe(gulp.dest(ENV_MODE.dest + '/license'));
};
