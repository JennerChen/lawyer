var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');

gulp.task('default',['webserver']);

gulp.task('compress', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
gulp.task('miniCss', function() {
  return gulp.src('css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('webserver', function() {
    connect.server({
    	port:9090,
    	livereload: true
    });
});
