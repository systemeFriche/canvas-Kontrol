var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');

gulp.task('pack-min-js', function () {
    return gulp.src(['src/assets/js/*.js'])
        .pipe(concat('objectsKontrol.min.js'))
        .pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('public/build/js'));
});

gulp.task('pack-min-css', function () {
    return gulp.src(['src/assets/css/*.css'])
        .pipe(concat('objectsKontrol.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/build/css'));
});

gulp.task('build', gulp.parallel('pack-min-js', 'pack-min-css'));

gulp.task('default', gulp.parallel('build'));



