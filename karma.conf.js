module.exports = function(config) {
    config.set({

        frameworks: ['mocha', 'browserify', 'chai'],

        files: [
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js',
            'app/**/*.spec.js'
        ],

        exclude: [
            'app/bower_components/**/*.js'
        ],

        preprocessors: {
            'app/app.js': ['browserify'],
            'app/**/*.spec.js': ['browserify']
        },

        reporters: ['progress'],
        port: 9876,
        colors: true,

        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,

        browserify: {
            extensions: ['.js'],
            debug: true,
            transform: ['babelify', 'partialify']
        }
    });
};
