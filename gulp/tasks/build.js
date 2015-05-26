var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function() {
    return runSequence('test:once', 'jshint', 'clean',
        // these are done async
        'copy:build',
        'browserify:build',
        'scss:build',
        'cachebust',
        'handlebars:build',
        'generate-service-worker',
        'uglify');
});
