const
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer')

const production_javascript = 'production/js'

gulp.task('js', (done) => {
    ['index.js'].map((entry) => {
        return browserify({
            entries: ['development/js/' + entry],
            transform: [babelify.configure({ presets: ["@babel/preset-env"] })],
            debug: true
        })
            .bundle()
            .pipe(source(entry))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(production_javascript))
    })
    done()
})