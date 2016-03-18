gulp = require('gulp');

var gutil = require('gulp-util'),
    bower = require('bower'),
    sh = require('shelljs'),
    runSequence = require('run-sequence'),
    taskLoader = require('gulp-task-loader'),
    config = require('./config.js');

var env = {
  dev: { path: config.DEV_PATH, dest: config.DEV_PATH + '/dist', mode: 'DEVELOPMENT' },
  cordova: { path: config.DEV_PATH, dest: config.CORDOVA_PATH, mode: 'CORDOVA' }
};

PATHS = {
  sass: ['../scss/**/*.scss']
};

taskLoader('gulp_tasks');

gulp.task('default', function() {
  ENV_MODE = env.cordova;
  runSequence('clean', ['bower', 'js', 'css', 'json', 'sass', 'partials', 'img'], 'inject', 'watch');
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
