var gulp = require('gulp');
var ts = require('gulp-typescript');
// var tsProject = ts.createProject('tsconfig.json', { noImplicitAny: true });

const tsElectronPath = './app-electron/';

gulp.task('electron-scripts', function(){
  return gulp.src(tsElectronPath+'**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            moduleResolution: "Node",
            module: "commonjs",
            sourceMap: false,
            // target: "es5",
            lib: [
                "es2016",
                "dom"
            ]
        }))
        .pipe(gulp.dest('./src/app-electron/'));
});

gulp.task('watch', ['electron-scripts'], function() {
    gulp.watch(tsElectronPath+'**/*.ts', ['electron-scripts']);
});

gulp.task('default', [ 'watch' ]);