import gulp from "gulp";
import gpug from "gulp-pug";
// npm i gulp-pug -D
import  del from "del";
// npm i del
import ws from 'gulp-webserver';

const routes = {
    pug: {
        watch: "src/**/*.pug",
        src: "src/*.pug",
        dest: "build"
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
}

// tesk 과정을 분류
const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);

const openDev = gulp.series([webserver, watch]);



export const dev = gulp.series([prepare, assets, openDev]);

/*
    개선사항
    
    2019-08-30
    - 오류가 나도 오류 메시지가 뜨질 않음
    - npm dev 명령어가 먹히질 않음

 */
