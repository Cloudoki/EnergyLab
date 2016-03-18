var mainBowerFiles  = require('main-bower-files'),
    filter          = require('gulp-filter'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify');

var filterByExtension = function(extension){
    return filter(function(file){
        return file.path.match(new RegExp('.' + extension + '$'));
    });
};

module.exports = function() {

    var mainFiles = mainBowerFiles();
    if(!mainFiles.length) return;

    var jsFilter = filterByExtension('js');
    gulp.src(mainFiles)
        .pipe(jsFilter)
        .pipe(concat('third-party-bower.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(ENV_MODE.dest + '/js'));

    var cssFilter = filterByExtension('css');
    gulp.src(mainFiles)
        .pipe(cssFilter)
        .pipe(concat('third-party-bower.css'))
        .pipe(gulp.dest(ENV_MODE.dest + '/css'));
};
