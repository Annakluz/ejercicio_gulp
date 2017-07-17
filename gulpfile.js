var gulp = require("gulp");
var uglify= require ("gulp-uglify");
var obfuscate = require ("gulp-obfuscate");
var sass = require ("gulp-sass");
var browserSync = require("browser-sync").create();


var rutas = {
    rutaJS: "./src/assets/js/*.js",
    rutaSCSS: "./src/assets/scss/*.scss",
    rutaHTML:"src/*.html",
}

gulp.task("prepararHTML", function(){
    gulp.src(rutas.rutaHTML)
    .pipe(gulp.dest("public/"))
});

gulp.task("prepararJS", function(){
    gulp.src(rutas.rutaJS)
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest("public"))
});

gulp.task("prepararCSS", function(){
    gulp.src(rutas.rutaSCSS)
    .pipe(sass({outputStyle: "compressed"})
         .on("error", sass.logError))
    .pipe(gulp.dest("public"))
});

gulp.task("watchChangesCSS", function(){
    browserSync.init({
        server: {
            baseDir:"./public"
        }
    });
    gulp.watch(rutas.rutaSCSS,["sass-watch"]);
    gulp.watch(rutas.rutaJS, ["js-watch"]);
    gulp.watch(rutas.rutaHTML, ["html-watch"]);
});

gulp.task("sass-watch", ["prepararCSS"], function(){
    browserSync.reload();
});

gulp.task("js-watch", ["prepararJS"], function(){
    browserSync.reload();
});

gulp.task("html-watch", ["prepararHTML"], function(){
    browserSync.reload();
});