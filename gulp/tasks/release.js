var gulp = require('gulp');
var bump = require('gulp-bump');
var git = require('gulp-git');
var filter = require('gulp-filter');
var tag = require('gulp-tag-version');
var runSequence = require('run-sequence');

function release(importance) {
    return runSequence('bump', 'changelog', function(){
        return doRelease(importance);
    });
}

function doRelease(importance) {
    return gulp.src(['./bower.json', './package.json'])
        .pipe(bump({
            type: importance
        }))
        .pipe(gulp.dest('./'));
}

gulp.task('dorelease', ['build'], function() {
    return gulp.src(['./bower.json', './package.json', './CHANGELOG.md', './build'])
        .pipe(git.add({
            args: '-f'
        }))
        .pipe(git.commit('chore(release): Bumps package version'))
        .pipe(filter('bower.json'))
        .pipe(tag());
});

gulp.task('patch', ['build'], function() {
    return release('patch');
});

gulp.task('feature', ['build'], function() {
    return release('minor');
});

gulp.task('release', ['build'], function() {
    return release('major');
});


