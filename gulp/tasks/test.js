var config = require('../config');

var gulp = require('gulp');

var karma = require('karma').server;

gulp.task('test:once', function(done) {
    karma.start({
        configFile: config.test.karma
    }, done);
});



gulp.task('test:watch', function(done) {
    karma.start({
        configFile: config.test.karma,
        singleRun: false,
        autoWatch: true
    }, done);
});
