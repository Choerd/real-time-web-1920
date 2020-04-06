const
    gulp = require('gulp'),
    requireDir = require('require-dir')('gulp-tasks')

const
    development_all_styles = 'development/scss/**/*.scss',
    development_all_javascript = 'development/js/**/*.js'

gulp.task('default', gulp.parallel('sass', 'js'))

gulp.task('watch', () => {
    gulp.watch(development_all_styles, gulp.series('sass'))
    gulp.watch(development_all_javascript, gulp.series('js'))
})