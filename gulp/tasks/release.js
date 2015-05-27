var gulp = require('gulp');
var bump = require('gulp-bump');
var git = require('gulp-git');
var filter = require('gulp-filter');
var tag = require('gulp-tag-version');
var runSequence = require('run-sequence').use(gulp);

var config = {
    releaseImportance: 'patch'
};

function getImportance() {
    return config.releaseImportance;
}

function release() {
    return runSequence(
        'test:once',
        'jshint',
        'clean',
        'copy:build',
        'browserify:build',
        'scss:build',
        'cachebust',
        'handlebars:build',
        'generate-service-worker',
        'uglify',
        'dobump',
        'changelog',
        'commit-release');
}

gulp.task('dobump', function() {
    return gulp.src(['./bower.json', './package.json'])
        .pipe(bump({
            type: getImportance()
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('commit-release', function() {
    return gulp.src(['./bower.json', './package.json', './CHANGELOG.md', './build', './build/*.*', './build/*'])
        .pipe(git.add({
            args: '-f -A'
        }))
        .pipe(git.commit('chore(release): Bumps package version'))
        .pipe(filter('bower.json'))
        .pipe(tag());
});

gulp.task('release:patch', function() {
    config.releaseImportance = 'patch';
    return release();
});

gulp.task('release:minor', function() {
    config.releaseImportance = 'minor';
    return release();
});

gulp.task('release:major', function() {
    config.releaseImportance = 'major';
    return release();
});
