var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var paths = {
    sass: ['./scss/**/*.scss'],
    app: './www/'
};

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
        .pipe(gulp.dest(paths.app+'css/'))
        .on('end', done);
});

// gulp
// by default compress files
gulp.task('default', ['sass']);

// gulp watch
// watch changes on sass files and run process if change
gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

// gulp install
// install bower components
gulp.task('install', [], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});