"use strict";

//init package
const gulp         = require('gulp');
const sass         = require('gulp-sass');
const browserSync  = require('browser-sync');
const cssnano			 = require('gulp-cssnano'); // Подключаем пакет для минификации CSS
const rename 			 = require('gulp-rename');
const concat  		 = require('gulp-concat');
const uglify 			 = require('gulp-uglifyjs'); // Подключаем uglifyjs (для сжатия JS)
const pngquant		 = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
const cache				 = require('gulp-cache');				// кеширует изображения
const autoprefixer = require("gulp-autoprefixer");// Подключаем библи`отеку для автоматического добавления префиксов
const imagemin		 = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
const del		 			 = require('del'); // Подключаем библиотеку для удаления файлов и папок
const bourbon      = require('node-bourbon'); // Подключаем библиотеку миксинов для SASS
const bourbon2     = require('bourbon'); // Подключаем библиотеку миксинов для SASS
const notify = require( 'gulp-notify' );

/*tasks*/

// sass to css
gulp.task("sass", function(){
  return gulp.src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({
			includePaths: bourbon.includePaths
		}).on( 'error', notify.onError( //перехватываем ошибки
      {
        message: "<%= error.message %>",
        title  : "Sass Error!"
      } ) )
		//.on('error', sass.logError) //перехватываем ошибки
		)
		.pipe(autoprefixer({browsers: ['last 10 versions'], cascade: false}))
    .pipe(gulp.dest("src/css")) //нельзя писать файл. Нужно только папки
    .pipe(browserSync.reload({
			stream: true
		}));
});

// reload browser
gulp.task("browserSync", function(){
  browserSync({
    server: {
      baseDir: './src' //папка с исходными файлами проекта
    },
    notify: false
  });
});

//compress and cached images
gulp.task('img', function(){
	return gulp.src("src/img/**/*")
			.pipe(cache(imagemin({
				interlaced:		true,
				progressive:	true,
				svgoPlugins:	[{removeViewBox: false}],
				une:					[pngquant()]
			})))
			.pipe(gulp.dest("dist/img"));
});

//очистка Cache
gulp.task("clearCache", function(){
	return cache.clearAll();
});

//concat and minification js libs
gulp.task("minJsLibs", function(){
	del.sync("src/js/libs.min.js"); // удаляем старую сборку
	return gulp.src([
				'src/libs/jquery/dist/jquery.min.js',
				// 'src/libs/bxslider-4/dist/jquery.bxslider.js',
				'src/libs/jquery.mask/jquery.mask.min.js',
				// 'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
				// 'src/libs/bootstrap-sass/assets/javascripts/bootstrap.min.js',
				// 'src/libs/owl.carousel/dist/owl.carousel.min.js',
				// 'src/libs/slick/dist/slick.min.js',
				'src/libs/jQueryFormStyler/dist/jquery.formstyler.min.js',
				'src/libs/rellax.min.js',
				'src/libs/arcticModal/arcticmodal/jquery.arcticmodal.js'
	])
			.pipe(concat("libs.min.js")) // собираем все библиотеки в один файл
			.pipe(uglify()) // сжимаем
			.pipe(gulp.dest("src/js"));
});

//concat and minification css libs
gulp.task("minCssLibs", ['sass'], function(){
	return gulp.src([
		// 'src/libs/owl-carousel/owl-carousel/owl.carousel.css',
		// 'src/libs/owl-carousel/owl-carousel/owl.theme.css',
		// 'src/libs/owl-carousel/owl-carousel/owl.transitions.css',
		// 'src/libs/magnific-popup/dist/magnific-popup.css',
		// 'src/libs/wow/css/animate.css'
		'src/css/libs.css'
	])
			.pipe(cssnano()) // сжимаем
			.pipe(rename({
				suffix: '.min'
			})) // добавляет суффикс .min
			.pipe(gulp.dest("src/css"));
});

//remove dist folder
gulp.task("remove", function(){
		return del.sync("dist"); // Удаляем папку dist перед сборкой
});

gulp.task("watch", ['browserSync', 'sass', 'minJsLibs', 'minCssLibs'], function(){
	gulp.watch("src/sass/**/*.+(scss|sass)", ['sass']); //массив запускаемых тасков
	gulp.watch("src/**/*.+(html|php)", browserSync.reload);
	gulp.watch("src/js/**/*.js", browserSync.reload);
});

//собираем проект в продакшн
gulp.task("build", ['remove', 'img', 'sass', 'minJsLibs'], function(){
	var buildCss = gulp.src("src/css/*").pipe(gulp.dest("dist/css"));

	var buildFonts = gulp.src("src/fonts/**/*")
			.pipe(gulp.dest("dist/fonts"));

	var buildJs = gulp.src("src/js/**/*")
			.pipe(gulp.dest("dist/js"));

	var buildHtml = gulp.src("src/*.html")
			.pipe(gulp.dest("dist/"));

	var buildPhp = gulp.src("src/*.php")
			.pipe(gulp.dest("dist/"));
});

//default gulp task call watch
gulp.task('default', ['watch']);