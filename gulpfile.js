/* File: gulpfile.js */
// grab our packages
var gulp = require('gulp'),
    minify = require('gulp-minify'),
    jshint = require('gulp-jshint'),
    gutil = require('gulp-util'),
    del = require('del');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);
gulp.task('clean', ['clean:all']);

gulp.task('clean:all', function() {
    gutil.log('clean:all is running!')
    return del([
        'public/**',
        'public-test/**'
    ]);
});

gulp.task('js', function() {
    gutil.log('js is running!')
    return gulp.src('source/javascript/bratok/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(minify())
        .pipe(gulp.dest('public/javascript/bratok'))
});

gulp.task('js-test', function() {
    gutil.log('js-test is running!')
    return gulp.src('source/javascript/bratok/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest('public-test/javascript/bratok'));
});

gulp.task('js-vendor', function() {
    gutil.log('js-vendor is running')
    return gulp.src([
            'source/javascript/vendor/**/*.js',
            'node_modules/angular/**/*.js',
            'node_modules/angular-route/**/*.js',
            'node_modules/angular-animate/**/*.js'
        ])
        .pipe(gulp.dest('public/javascript/vendor/'))
});

gulp.task('js-vendor-test', function() {
    gutil.log('js-vendor-test is running')
    return gulp.src([
            'source/javascript/vendor/**/*.js',
            'node_modules/angular/**/*.js',
            'node_modules/angular-route/**/*.js',
            'node_modules/angular-animate/**/*.js'
        ])
        .pipe(gulp.dest('public-test/javascript/vendor/'));
});

gulp.task('css', function() {
    gutil.log('css is running!')
    return gulp.src('source/css/bratok/**/*.*')
        .pipe(gulp.dest('public/css/bratok'))
});

gulp.task('css-test', function() {
    gutil.log('css-test is running!')
    return gulp.src('source/css/bratok/**/*.*')
        .pipe(gulp.dest('public-test/css/bratok'))
});

gulp.task('css-vendor', function() {
    gutil.log('css-vendor is running!')
    return gulp.src('source/css/vendor/**/*.*')
        .pipe(gulp.dest('public/css/vendor/'))
});

gulp.task('css-vendor-test', function() {
    gutil.log('css-vendor-test is running!')
    return gulp.src('source/css/vendor/**/*.*')
        .pipe(gulp.dest('public-test/css/vendor/'));
});

gulp.task('html', function() {
    gutil.log('html is running!')
    return gulp.src('source/html/**/*.*').pipe(gulp.dest('public/html/'));
});

gulp.task('html-test', function() {
    gutil.log('html-test is running!')
    return gulp.src('source/html/**/*.*').pipe(gulp.dest('public-test/html/'));
});



// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    tasks = [
        'js', 'js-test', 'js-vendor', 'js-vendor-test',
        'css', 'css-test', 'css-vendor', 'css-vendor-test',
        'html', 'html-test'
    ];
    gulp.run(tasks);
    gulp.watch('source/javascript/**/*.js', tasks);
    gulp.watch('source/css/**/*.*', tasks);
    gulp.watch('source/html/**/*.*', tasks);
});

/* MAKE TEST */
