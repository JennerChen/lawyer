var gulp = require('gulp');
//new one for mini css
var cssnano = require('gulp-cssnano');
//old one
//var minifyCss = require('gulp-minify-css');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
//var path = require('path');
var livereload = require('gulp-livereload');

gulp.task('default', ['webserver', 'watch']);

gulp.task('compress', function () {
	return gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});
gulp.task('miniCss',['less'], function () {
	return gulp.src('css/**/*.css')
		.pipe(cssnano({discardComments: {removeAll: true}}))
		.pipe(gulp.dest('dist/css'));
});
gulp.task('less', function () {
	return gulp.src('less/**/*.less')
		.pipe(less())
		.pipe(gulp.dest('./css/cssFromLess'));
});
gulp.task('concat',['miniCss'], function() {
	gulp.src(['./css/cssFromLess/*.css','./css/hack.css'])    //- 需要处理的css文件，放到一个字符串数组里
		.pipe(concat('app.min.css'))                            //- 合并后的文件名
		.pipe(cssnano())
		.pipe(gulp.dest('./dist/css'));                               //- 输出文件本地
});

gulp.task('miniImage', function () {
	gulp.src('./img/**/*.{png,jpg,gif,ico}')
		.pipe(imagemin({
			optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
			progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
			interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
			multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
		}))
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('deepMinimage', function () {
	gulp.src('./img/**/*.{png,jpg,gif,ico}')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
			use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
		}))
		.pipe(gulp.dest('./dist/img'));
});
gulp.task('watch', function () {
	gulp.watch('*.html', ['reload-dev']);
	gulp.watch('js/**/*.js', ['reload-dev']);
	gulp.watch('css/**/*.css', ['reload-dev']);
});
gulp.task('reload-dev', function () {
	gulp.src('**/*.html')
		.pipe(connect.reload());
});
gulp.task('webserver', function () {
	connect.server({
		root: '.',
		port: 9090,
		livereload: true
	});
});
