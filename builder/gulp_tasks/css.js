var concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename');

module.exports = function() {

	gulp.src( ENV_MODE.path + '/css/**/*' )
		.pipe(concat('app-styles.css'))
    .pipe(minifyCss())
    .pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest(ENV_MODE.dest + '/css'));
};
