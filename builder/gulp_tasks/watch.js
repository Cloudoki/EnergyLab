module.exports = function() {

  gulp.watch(ENV_MODE.path + '/config.js', ['js', 'inject']);
  gulp.watch(ENV_MODE.path + '/css/**/*', ['sass']);
  gulp.watch(ENV_MODE.path + '/img/**/*', ['img']);
  gulp.watch(ENV_MODE.path + '/js/**/*.js', ['js']);
  gulp.watch([ENV_MODE.path + '/js/**/*.js', ENV_MODE.path + '/index.html'], ['inject']);
  gulp.watch(ENV_MODE.path + '/templates/**/*.json', ['json']);
  gulp.watch(ENV_MODE.path + '/partials/**/*.html', ['partials']);

  //gulp.watch(ENV_MODE.path + '/index.html', ['html']);
};
