var gulp = require("gulp");
var uglify= require ("gulp-uglify");
var obfuscate = require ("gulp-obfuscate");
var sass = require ("gulp-sass");
var browserSync = require("browser-sync").create();


var rutas = {
    rutaJS: "./src/assets/js/*.js",
    rutaSCSS: "./src/assets/scss/*.scss"
}

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
    gulp.watch(rutas.rutaSCSS,["sass-watch"])
});

gulp.task("sass-watch", ["prepararCSS"], function(){
    browserSync.reload();
});

