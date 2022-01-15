const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');

function js() {
    return gulp.src("src/js/*.js")
        .pipe(browserSync.stream());
}

async function styles() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
}

browserSync.init({
    server: {
        baseDir: 'src',
        host: '192.168.0.104',
    },
    callbacks: {
        ready: function (err, bs) {
            bs.addMiddleware("*", function (req, res) {
                res.writeHead(302, {
                    location: "404.html"
                });
                res.end("Redirecting!");
            });
        }
    },
    browser: 'chrome',
    logPrefix: 'Kort sync',
    logLevel: 'info',
    logConnections: true,
    logFileChanges: true,
    open: true
})


gulp.task('default', function() {
    gulp.watch("src/*.html");
    gulp.watch("src/scss/**/*.scss", styles);
    gulp.watch("src/css/*.css");
    gulp.watch("src/js/*.js", js);
    livereload({ start: true })
});