var angularFilesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject');

module.exports = function() {

	gulp.src( ENV_MODE.path + '/index.html')
      .pipe(inject(
        gulp.src([ENV_MODE.path + '/config.js']), {starttag: '<!-- inject:config:js -->', relative: true}
      ))
      .pipe(inject(
        gulp.src([ENV_MODE.path + '/js/app/**/*app.module.js']), {starttag: '<!-- inject:angular:main:js -->', relative: true}
  		))
		  .pipe(inject(
			  gulp.src([ENV_MODE.path + '/js/app/**/*.js', '!' + ENV_MODE.path + '/js/**/*app.module.js']).pipe(angularFilesort()), {starttag: '<!-- inject:angular:{{ext}} -->', relative: true}
  		))
  		.pipe(gulp.dest(ENV_MODE.dest))
  		.pipe(inject(
			  gulp.src([ENV_MODE.dest + '/js/vendor/**/*.js']), {starttag: '<!-- inject:vendor:{{ext}} -->', relative: true}
  		))
  		.pipe(gulp.dest(ENV_MODE.dest))
      .pipe(inject(
        gulp.src([ENV_MODE.dest + '/js/**/*third-party-bower.js']), {starttag: '<!-- inject:bower:{{ext}} -->', relative: true}
      ))
      .pipe(gulp.dest(ENV_MODE.dest))
      .pipe(inject(
        gulp.src([ENV_MODE.dest + '/css/**/*.css', '!' + ENV_MODE.dest + '/css/**/*ionic.app.css']), {starttag: '<!-- inject:styles:{{ext}} -->', relative: true}
      ))
      .pipe(gulp.dest(ENV_MODE.dest));
};
