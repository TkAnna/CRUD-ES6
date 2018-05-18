let gulp = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-clean-css');

gulp.task('default', function () {
    gulp.src(['src/js/functions.js',
        'src/js/elementClass.js',
        'src/js/user.js',
        'src/js/data.js',
        'src/js/form.js',
        'src/js/table.js',
        'src/js/app.js'])
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'));

    gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
        'src/css/style.css'])
        .pipe(minifyCSS())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist'));

});

// gulp.task('watch',function () {
//     gulp.watch('src/js/*.js',['default']);
// });