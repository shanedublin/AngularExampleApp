var gulp = require('gulp');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort')
var browserSync = require('browser-sync').create();
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('default',function(callback){
  runSequence('bye-bye','copy-bower','js','build',callback);

});

gulp.task('bye-bye',function(){
  return del.sync(['build/**','!build']);
});

gulp.task('build',  function(){

  return gulp.src('./src/index.html')
    .pipe(inject(
      gulp.src('./build/**/*.js') // gulp-angular-filesort depends on file contents, so don't use {read: false} here
        .pipe(angularFilesort())
      ))
    .pipe(gulp.dest('./build'));

});

gulp.task('copy-bower',function(){
    return gulp.src(mainBowerFiles())
    .pipe(gulp.dest('./build/bower'));
});

gulp.task('js', function () {
    return gulp.src('src/app/**')
    .pipe(gulp.dest('./build/app'));


});


gulp.task('js-watch', ['build'], browserSync.reload);

gulp.task('serve', ['build'],  function(){

  browserSync.init({
      server:{
        baseDir: "./dist"
      }
  });

  gulp.watch("src/*",['js-watch']);
});
