const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean_css = require('gulp-clean-css');
const rename = require('gulp-rename');
const fs = require('fs');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2svg = require('gulp-ttf-svg');
const ttf2eot = require('gulp-ttf2eot');
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');
const sourcemaps = require('gulp-sourcemaps');

const project_folder = 'dist';
const source_folder = 'src';

const path = {
    root: './dist',
    templates: {
        pages: source_folder + '/views/pages/*.pug',
        src: source_folder + '/views/**/*.pug',
        dest: project_folder + '/',
    },
    styles: {
        main: source_folder + '/styles/main.sass',
        src: source_folder + '/styles/**/*.+(sass|scss)',
        dest: project_folder + '/css/',
    },
    fonts: {
        font: source_folder + '/assets/fonts/*.ttf',
        fontSass: source_folder + '/styles/basics/_fonts.sass',
        dest: project_folder + '/fonts/'
    },
    images: {
        all: source_folder + '/assets/images/**/*.{jpg,png,svg,gif,ico,webp}',
        dest: project_folder + '/images/'
    },
    scripts: {
        src: source_folder + '/scripts/main.js',
        all: source_folder + '/scripts/**/*.js',
        dest: project_folder + '/scripts/',
    }
}

function watch() {
    gulp.watch(path.styles.src, styles);
    gulp.watch(path.templates.src, templates);
    gulp.watch(path.images.all, images);
    gulp.watch(path.scripts.all, scripts);
}

function server() {
    browserSync.init({
        server: path.root,
        notify: false
    });
    browserSync.watch(path.root + '/**/*.*', browserSync.reload);
}

function clean() {
    return del(path.root);
}

function templates() {
    return gulp.src(path.templates.pages)
        .pipe(pug({ pretty: '\t' }))
        .pipe(gulp.dest(path.root))
}

function styles() {
    return gulp.src(path.styles.main)
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'expanded'
            })
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 version"],
                grid: true,
                cascade: true
            })
        )
        .pipe(gulp.dest(path.styles.dest))
        .pipe(clean_css()) //минимизация файла
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.styles.dest))
}

function fonts() {
    gulp.src(path.fonts.font)
        .pipe(ttf2woff())
        .pipe(gulp.dest(path.fonts.dest))
    gulp.src(path.fonts.font)
        .pipe(ttf2woff2())
        .pipe(gulp.dest(path.fonts.dest))
    gulp.src(path.fonts.font)
        .pipe(ttf2eot())
        .pipe(gulp.dest(path.fonts.dest))
    gulp.src(path.fonts.font)
        .pipe(ttf2svg())
        .pipe(gulp.dest(path.fonts.dest))
    return gulp.src(path.fonts.font)
        .pipe(gulp.dest(path.fonts.dest))
}

function fontsStyle(done) {
    let file_content = fs.readFileSync(srcFonts);

    fs.writeFile(path.fonts.fontSass, '', (function () {}()));
    fs.readdir(path.fonts.dest, function (err, items) {
        if (items) {
            let c_fontname;
            for (var i = 0; i < items.length; i++) {
                let fontname = items[i].split('.');
                fontname = fontname[0];
                if (c_fontname != fontname) {
                    fs.appendFile(path.fonts.fontSass, '@include font-face("' + fontname + '", "' + fontname + '", 400);\r\n', (function () {}()));
                }
                c_fontname = fontname;
            }
        }
    })
    done();
}

function images() {
    return gulp.src(path.images.all)
        .pipe(gulp.dest(path.images.dest))
}

function scripts() {
    return gulp.src(path.scripts.src)
        .pipe(fileinclude())
        .pipe(
            babel({
                presets: ["@babel/env"]
            })
        )
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(path.scripts.dest))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.scripts.dest))
}

// function vendorJS() {
//     const modules = [
//         'node_modules/jquery/dist/jquery.min.js',
//         'src/scripts/libs/jquery.fancybox.min.js',
//         'src/scripts/libs/datepicker.min.js',
//     ];

//     return gulp.src(modules)
//         .pipe(gulp.dest(path.scripts.vendors));
// }
// function vendorCSS() {
//     const modules = [
//         'src/styles/libs/jquery.fancybox.min.css',
//         'src/styles/libs/datepicker.min.css'
//     ];

//     return gulp.src(modules)
//         .pipe(gulp.dest(path.styles.vendors));
// };

exports.templates = templates;
// exports.templatesPopups = templatesPopups;
exports.styles = styles;
// exports.stylesVendors = vendorCSS;
exports.fonts = fonts;
exports.fontsStyle = fontsStyle;
exports.images = images;
exports.scripts = scripts;
// exports.scriptsVendors = vendorJS;

// DEPLOY
function deploy() {
    let conn = ftp.create({
        host: '',
        user: '',
        password: '',
        parallel: 10,
        log: gutil.log
    });

    let globs = [
        'dist/**',
    ];

    return gulp.src(globs, {
        base: './dist',
        buffer: false
    })
        .pipe(conn.newer('/')) // only upload newer files
        .pipe(conn.dest('/'));
}

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, fonts, images, scripts),
    gulp.parallel(watch, server)
));

exports.deploy = deploy;