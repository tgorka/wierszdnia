var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');
var cordova = require('cordova-lib').cordova;
var typescript = require('gulp-typescript');

var paths = {};
paths.sass =  ['./scss/**/*.scss'];
paths.ts = ['./typings/**/*.d.ts', './ts/**/*.ts'];
paths.www = ['./www/**/*'];
paths.app = './www/';
paths.css = paths.app + 'css/';
paths.js = paths.app + 'js/';
paths.lib = paths.app + 'lib/';
paths.nodeModules = './node_modules/';

libs = [
    // order is important
    // IE required polyfills, in this exact order
    paths.nodeModules + 'es6-shim/es6-shim.min.js',
    paths.nodeModules + 'systemjs/dist/system-polyfills.js',

    paths.nodeModules + 'angular2/bundles/angular2-polyfills.js',
    paths.nodeModules + 'angular2/bundles/angular2-polyfills.min.js',
    paths.nodeModules + 'systemjs/dist/system.src.js',
    paths.nodeModules + 'systemjs/dist/system.js',
    paths.nodeModules + 'rxjs/bundles/Rx.js',
    paths.nodeModules + 'rxjs/bundles/Rx.min.js',
    paths.nodeModules + 'angular2/bundles/angular2.dev.js',
    paths.nodeModules + 'angular2/bundles/angular2.min.js',
    paths.nodeModules + 'angular2/bundles/http.dev.js',
    paths.nodeModules + 'angular2/bundles/http.min.js',

    paths.nodeModules + 'ng2-material/dist/ng2-material.js',
    paths.nodeModules + 'ng2-material/dist/ng2-material.min.js',
    paths.nodeModules + 'ng2-material/all.webpack.js',
    paths.nodeModules + 'ng2-material/all.webpack.styles.js',
    paths.nodeModules + 'ng2-material/all.js'

];

// gulp sass
// compress sass into css folder and minify
gulp.task('sass', function(done) {
    gulp.src(paths.sass)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest(paths.app+'css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(paths.css))
        .on('end', done);
});

// gulp typescript
// compile typescript into js folder and minify and change to ES5
gulp.task('typescript', function () {
    return gulp.src(paths.ts)
            .pipe(typescript({
                noImplicitAny: true,
                module: 'system', /* System.register([dependencies], function) (in JS)*/
                moduleResolution: 'node',
                emitDecoratorMetadata: true,
                experimentalDecorators: true, //ES7 feature
                pretty: true,
                allowJs: true,
                target: 'ES5',
                exclude: ['node_modules', 'bower_components'],
                outDir: paths.js
                //outFile: 'app.min.js'
            }))
            .pipe(gulp.dest(paths.js));
});

// build develop
gulp.task('debug', ['sass', 'typescript'], function(done) {
    cordova.build({
        "platforms": ['browser'],
        "options": {
            argv: ['--debug', '--nobuild', '--gradleArg=--no-daemon']
        }
    }, done);
});

// gulp runandroid
// on connected android device with usb debug on
gulp.task('runandroid', ['sass', 'typescript'], function(done) {
    cordova.run({
        "platforms": ['android'],
        "options": {
            argv: ['--device']
        }
    }, done);
});

// gulp runios
// on connected android device with usb debug on
gulp.task('runios', ['sass', 'typescript'], function(done) {
    cordova.run({
        "platforms": ['ios'],
        "options": {
            argv: ['--device']
        }
    }, done);
});

// gulp emulate
// run android emulator with the device
gulp.task('androidemulate', ['sass', 'typescript'], function(done) {
    cordova.emulate({
        "platforms": ['android'],
        "options": {
            argv: ['--debug', '--nobuild', '--live-reload', '--gradleArg=--no-daemon']
        }
    }, done);
});

// gulp emulate
// run android emulator with the device
gulp.task('iosemulate', ['sass', 'typescript'], function(done) {
    cordova.emulate({
        "platforms": ['ios'],
        "options": {
            argv: ['--debug', '--nobuild', '--live-reload', '--gradleArg=--no-daemon']
        }
    }, done);
});

// gulp emulate
// run android emulator with the device
gulp.task('browseremulate', ['sass', 'typescript'], function(done) {
    cordova.emulate({
        "platforms": ['browser'],
        "options": {
            argv: ['--debug', '--nobuild', '--live-reload', '--gradleArg=--no-daemon']
        }
    }, done);
});

// gulp release
// build all platforms for release
gulp.task('release', ['sass', 'typescript'], function(done) {
    cordova.build({
        "platforms": ['android', 'ios', 'browser'],
        "options": {
            argv: ['--release','--gradleArg=--no-daemon']
        }
    }, done);
});

// gulp
// by default compress files
gulp.task('default', ['sass', 'typescript']);

// gulp watch
// watch changes on sass files and run process if change
gulp.task('watch', ['sass', 'typescript', 'browseremulate'], function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.ts, ['typescript']);
    gulp.watch(paths.www, ['debug']);
});

// gulp clean
// remove generated css files
// clean cordova app
gulp.task('clean', function(done) {
    del([paths.css+'*.css'], done);
    del([paths.js+'*.js'], done);
    cordova.clean({}, done);
});

// gulp lib
// copy libs from node_components to lib
gulp.task('lib', function() {
    return gulp.src(libs).
        // compress, minify
        pipe(gulp.dest(paths.lib));
});

// gulp install
// install bower components
gulp.task('install', ['lib'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});