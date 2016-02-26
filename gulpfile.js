var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');
var cordova = require('cordova-lib').cordova;

var paths = {};
paths.sass =  ['./scss/**/*.scss'];
paths.app = './www/';
paths.css = paths.app + 'css/';

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

// build develop
gulp.task('build', ['sass'], function(done) {
    cordova.build({
        "platforms": ['android'],
        "options": {
            argv: ['--debug', '--nobuild', '--gradleArg=--no-daemon']
        }
    }, done);
});

// gulp release
// build all platforms for release
gulp.task('release', ['sass'], function(done) {
    cordova.build({
        "platforms": ['android', 'ios', 'browser'],
        "options": {
            argv: ['--release','--gradleArg=--no-daemon']
        }
    }, done);
});

// gulp
// by default compress files
gulp.task('default', ['sass']);

// gulp watch
// watch changes on sass files and run process if change
gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

// gulp clean
// remove generated css files
// clean cordova app
gulp.task('clean', function(done) {
    del([paths.css+'*.css'], done);
    cordova.clean({}, done);
});

// gulp install
// install bower components
gulp.task('install', [], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});