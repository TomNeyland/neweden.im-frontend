// this is needed because it *looks* like karma wants an absolute
// path to the conf file
var karmaConfigPath = require('path').resolve('.') + '/karma.conf.js';

module.exports = {
    app: './app',
    build: './build',
    html: {
        files: [
            './app/**/*.html',
            '!./app/bower_components/**/*.html',
        ]
    },
    js: {
        files: [
            './app/**/*.js',
            '!./app/**/*.spec.js',
            '!./app/bower_components/**/*.js',
            '!./app/*.min.js',
            '!./app/*.worker.js'
        ]
    },
    scss: {
        files: [
            './app/**/*.scss',
            '!./app/bower_components/**/*.scss'
        ],
        src: './app/app.scss',
        materialFiles: [
            './node_modules/angular-material-source/src/core/style/variables.scss',
            './node_modules/angular-material-source/src/core/style/color-palette.scss',
            './node_modules/angular-material-source/src/core/style/mixins.scss',
            './node_modules/angular-material-source/src/core/style/structure.scss',
            './node_modules/angular-material-source/src/core/style/typography.scss',
            './node_modules/angular-material-source/src/core/style/layout.scss',
            './node_modules/angular-material-source/src/{components,services}/**/*.scss'
        ],
        devDest: './app/app.css',
        buildDest: './build/app.css'
    },
    browserify: { in : './app/app.js',
        out: 'app.min.js'
    },
    test: {
        karma: karmaConfigPath
    },
    serviceWorker: {
        name: 'service.worker.js'
    }
};
