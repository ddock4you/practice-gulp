import gulp from "gulp";
import gpug from "gulp-pug";
// npm i gulp-pug -D
import  del from "del";
// npm i del
import ws from 'gulp-webserver';
import image from "gulp-image";
// npm i gulp-image -D
// gulp-image 설치 후 실행을 하면 취약점이 발견됐다면서 
import sass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";

sass.compiler = require("node-sass");

const routes = {
    pug: {
        watch: "src/**/*.pug",
        src: "src/*.pug",
        dest: "build"
    },
    img: {
        src: "src/img/*",
        dest: "build/img"
    },

    sass: {
        src: "src/sass/style.scss",
        dest: "build/css"
    },

    js: {
        watch: "src/**/*.js",
        src: "src/js/main.js",
        dest: "build/js"
    }
}

const pug = () => 
    gulp
        .src(routes.pug.src)
        .pipe(gpug())
        .pipe(gulp.dest(routes.pug.dest));

const clean = () => del(["build"]);

const webserver = () => 
    gulp.src("build").pipe(ws({
        livereload: true,
        open: true
    }));
// 중괄호를 삭제하고 실행하니 그제서야 제대로 실행됐음
// es6에서 중괄호 있고 없고의 차이를 파악하기(return 말고 다른 기능이 있는지)

const watch = () => {
    gulp.watch(routes.pug.watch, pug);
    gulp.watch(routes.img.src, img);
    gulp.watch(routes.sass.src, styles);
    gulp.watch(routes.js.watch, js);
}
// 파일 변동 있을 때 마다 pug와 img 함수를 실행


const img = () => 
    gulp
        .src(routes.img.src)
        .pipe(image())
        .pipe(gulp.dest(routes.img.dest));


const styles = () =>
    gulp
        .src(routes.sass.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 3 version']
           //  browsers: ['last 3 version'] 에러 뜸
        }))
        .pipe(csso())
        .pipe(gulp.dest(routes.sass.dest));
    
// Replace Autoprefixer browsers option to Browserslist config.
// Use browserslist key in package.json or .browserslistrc file.

// Using browsers option cause some error. Browserslist config 
// can be used for Babel, Autoprefixer, postcss-normalize and other tools.

// If you really need to use option, rename it to overrideBrowserslist.

// Learn more at:
// https://github.com/browserslist/browserslist#readme
// https://twitter.com/browserslist


const js = () => 
        gulp
            .src(routes.js.src)
            .pipe(bro({
                transform: [
                    babelify.configure({presets: ['@babel/preset-env']})
                ]
            }))
            .pipe(gulp.dest(routes.js.dest));

// tesk 과정을 분류 ***********************************************************
const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles, js]);

const openDev = gulp.series([webserver, watch]);



export const dev = gulp.series([prepare, assets, openDev]);

/*
    개선사항
    
    2019-08-30
    - 오류가 나도 오류 메시지가 뜨질 않음
    - npm dev 명령어가 먹히질 않음

 */
