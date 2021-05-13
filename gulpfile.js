const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const rimraf = require('rimraf');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

/* -------- Server  -------- */
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload);
});

/* ------------ Pug compile ------------- */
gulp.task('templates:compile', function buildHTML() {
    return gulp.src('pages/landing/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
});
/* --------  js -------- */
gulp.task('js', function() {
    return gulp.src([
            'js/main.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

/* ------------ Styles compile ------------- */
gulp.task('styles:compile', function() {
    return gulp.src('styles/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'));
});

/* ------------ Delete ------------- */
gulp.task('clean', function del(cb) {
    return rimraf('build', cb);
});

/* ------------ Copy fonts ------------- */
gulp.task('copy:assets/fonts', function() {
    return gulp.src('./assets/fonts/**/*.*')
        .pipe(gulp.dest('build/assets/fonts'));
});

/* ------------ Copy images ------------- */
gulp.task('copy:assets/images', function() {
    return gulp.src('./assets/images/**/*.*')
        .pipe(gulp.dest('build/assets/images'));
});

/* ------------ Copy ------------- */
gulp.task('copy', gulp.parallel('copy:assets/fonts', 'copy:assets/images'));

/* ------------ Watchers ------------- */
gulp.task('watch', function() {
    gulp.watch('pages/**/*.pug', gulp.series('templates:compile'));
    gulp.watch('styles/**/*.scss', gulp.series('styles:compile'));
    gulp.watch('js/main.js', gulp.series('js'));
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('templates:compile', 'js', 'styles:compile', 'copy'),
    gulp.parallel('watch', 'server')
));