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

function swallowError(error){
  console.log(error.toString());
   this.emit('end');
}

function logger(msg){
  console.log(msg);
}

gulp.task('build',function(callback){
  runSequence('delete-dist','js-hint',['bower-dist','src-dist','index-dist'],callback);
})

gulp.task('delete-dist',function(){
  return del.sync(['dist/**','!dist']);
});

gulp.task('index-dist',function(){
  gulp.src('./src/index.html')
  .pipe(inject(gulp.src(mainBowerFiles(),  {read: false}), {name: 'bower'}))
  .pipe(inject(gulp.src('./src/app/**/*.js').pipe(angularFilesort()), {relative:true}))
  .pipe(inject(gulp.src('./src/app/**/*.css'), {relative:true}))
  .on('error',swallowError)
  .pipe(gulp.dest('./dist'));
});


gulp.task('bower-dist', function(){
  return gulp.src(mainBowerFiles(),{base:'bower_components'})
  .pipe(gulp.dest('./dist/bower_components'));
});


gulp.task('src-dist',function(){
  return gulp.src(['src/**','!src/index.html'])
  .pipe(gulp.dest('./dist'));
});

gulp.task('js-hint',function(){
  return gulp.src('src/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter(logger));
});


gulp.task('js-watch', ['build'], function(){
  browserSync.reload();
});


gulp.task('serve', ['build'],  function(){

  browserSync.init({
      server:{
        baseDir: "dist",
        index: "index.html"
      },
      port:3000,
      reloadDelay: 1000
  })

  gulp.watch("src/**",['js-watch']);
});
