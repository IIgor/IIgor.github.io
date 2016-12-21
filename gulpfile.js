var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber');



 
//sass
gulp.task('sass', function () {
  gulp.src('sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(plumber())
      .pipe(autoprefixer({
          browsers: ['last 4 versions'],
          cascade: false
      }))
      .pipe(gulp.dest('css'))
});



gulp.task('watch', function () {
  gulp.watch('sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
 

//'connect', 
 /**
  * start gulp -- gulp
  */
