import gulp from "gulp";
import gpug from "gulp-pug";
// npm i gulp-pug -D
import  del from "del";
// npm i del

const routes = {
    pug: {
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


// tesk 과정을 분류
const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);


export const dev = gulp.series([prepare, assets]);

/*
    개선사항
    
    2019-08-30
    - 오류가 나도 오류 메시지가 뜨질 않음
    - npm dev 명령어가 먹히질 않음

 */
