var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

gulp.task('pack-min-js', function () {
    return gulp.src(['lib/*.js'])
        .pipe(concat('objectsKontrol.min.js'))
        .pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('dist/'));
});

