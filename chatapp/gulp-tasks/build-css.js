const
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    sassGlob = require('gulp-sass-glob'),
    cleanCSS = require('gulp-clean-css')

const
    development_main_styles = 'development/scss/index.scss',
    production_styles = 'production/css'

gulp.task('sass', () => {
    return gulp.src(development_main_styles)
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(production_styles))
})
