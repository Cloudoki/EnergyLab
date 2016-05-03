var cheerio = require('cheerio'),
    replace = require('gulp-replace'),
    fs = require('fs');

module.exports = function() {
    // Read main config.xml
    var xml = fs.readFileSync('../config.xml');
    // Use cheerio to parse the xml and extract the version number
    var ch = cheerio.load(xml, { xmlMode: true });
    var version = ch('widget')[0].attribs.version;

    return gulp.src( ENV_MODE.path + '/partials/**/*' )
        .pipe( replace("#0.0.0#", version) )
        .pipe(gulp.dest(ENV_MODE.dest + '/partials'));
};
