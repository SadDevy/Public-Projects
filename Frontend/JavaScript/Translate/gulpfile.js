let project_folder = "build";
let source_folder = "src";

let path = {
	build: {
		html: project_folder + "/",
		css: project_folder + "/css/",
		js: project_folder + "/js/",
		json: project_folder + "/js/",
		img: project_folder + "/img/",
		fonts: project_folder + "/fonts/"
	},
	src: {
		html: source_folder + "/*.html",
		css: source_folder + "/style/main.scss",
		js: source_folder + "/js/*.js",
		json: source_folder + "/js/*.json",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,icp,webp}",
		fonts: source_folder + "/fonts/*.ttf"
	},
	watch: {
		html: source_folder + "/**/*.html",
		css: source_folder + "/style/**/*.scss",
		js: source_folder + "/js/**/*.js",
		json: source_folder + "/js/**/*.json",
		img: source_folder + "/img/**/*.{jpg,png,svg,gif,icp,webp}",
	},
	clean: "./" + project_folder + "/"
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	del = require('del'),
	scss = require('gulp-sass')(require('sass')),
	clean_css = require('gulp-clean-css'),
	rename = require('gulp-rename');

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		port: 1000,
		notify: false
	})
}

function html() {
	return src(path.src.html)
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.src.js)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}

function json() {
	return src(path.src.json)
		.pipe(dest(path.build.json))
		.pipe(browsersync.stream());
}

function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
		.pipe(browsersync.stream());
}

function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.json], json);
}

function clean(params) {
	return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(fonts, css, html, js, json));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.js = js;
exports.css = css; 
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;