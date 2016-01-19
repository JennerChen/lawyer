var gulp = require('gulp');
//new one for mini css
var cssnano = require('gulp-cssnano');
//old one
var minifyCss = require('gulp-minify-css');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var path = require('path');
var livereload = require('gulp-livereload');
 
gulp.task('default',['webserver','watch']);

gulp.task('compress', function() {
  return gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
gulp.task('miniCss', function() {
  return gulp.src('css/*.css')
    .pipe(cssnano({discardComments: {removeAll: true}}))
    .pipe(gulp.dest('dist/css'));
});
gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});
gulp.task('watch', function () {   
    gulp.watch('*.html', ['reload-dev']);
    gulp.watch('js/**/*.js', ['reload-dev']);
    gulp.watch('css/**/*.css', ['reload-dev']);
});
//reload server
gulp.task('reload-dev',function() {
  gulp.src('**/*.html')
    .pipe(connect.reload());
});
gulp.task('webserver', function() {
    connect.server({
        root:'.',
    	port:9090,
    	livereload: true
    });
});
