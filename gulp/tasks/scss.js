var config = require('../config');

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var filter = require('gulp-filter');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');

var reload = require('browser-sync').reload;

gulp.task('scss:dev', function(cb) {
    gulp
        .src([config.scss.src].concat(config.scss.materialFiles))
        .pipe(concat('app.css'))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(config.app))
        .pipe(filter(config.app + '/*.css'))
        .pipe(filter('*.css'))
        .pipe(reload({
            stream: true
        }));
    cb();
});

gulp.task('scss:build', function() {
    return gulp
        .src([config.scss.src].concat(config.scss.materialFiles))
        .pipe(concat('app.css'))
        .pipe(autoprefixer())
        .pipe(minify({
            keepSpecialComments: 0
        }))
        .pipe(gulp.dest(config.build));
});
