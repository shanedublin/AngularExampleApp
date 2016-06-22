'use-strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort')
var browserSync = require('browser-sync').create();
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');

gulp.task('default',function(callback){
  runSequence('bye-bye','copy-bower','js','build',callback);

});

gulp.task('hate',function(callback){
  runSequence('bye-bye','copy-bower','js','build',callback);
});

gulp.task('bye-bye',function(){
  return del.sync(['build/**','!build'],{"force":false});
});

gulp.task('build',  function(){


  return gulp.src('./build/index.html')
    .pipe(inject(
      gulp.src('./build/**/*.js') // gulp-angular-filesort depends on file contents, so don't use {read: false} here
        .pipe(angularFilesort())
      ,{relative:true}))
      .on('error',swallorErorr)
    .pipe(gulp.dest('./build'));

});

function swallorErorr(error){
  console.log(error.toString());
   this.emit('end');
}

gulp.task('copy-bower',function(){
    return gulp.src(mainBowerFiles())
    .pipe(gulp.dest('./build/bower'));
});


gulp.task('js', function () {

    return gulp.src('src/**')

    .pipe(gulp.dest('./build'));
});


gulp.task('js-watch', ['hate'], function(){
  browserSync.reload();
});

gulp.task('serve', ['hate'],  function(){

  browserSync.init({
      server:{
        baseDir: "build",
        index: "index.html"
      },
      port:3000,
      reloadDelay: 1000
  })

  gulp.watch("src/**",['js-watch']);
});
