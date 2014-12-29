var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')

gulp.task('js', function () {
    gulp.src([
        'js/app/app.js',
        'js/app/**/*.js'
        ])
      .pipe(concat('js/toyota-poc.js'))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(gulp.dest('.'))
})

//gulp.task('watch', ['js'], function () {
//    gulp.watch('js/app/**/*.js', ['js'])
//})