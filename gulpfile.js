const autoprefixer = require('autoprefixer')
const browsersync = require('browser-sync').create()
const cssnano = require('cssnano')
const del = require('del')
const eslint = require('gulp-eslint')
const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const nunjucks = require('gulp-nunjucks-html')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const webp = require('gulp-webp')
const webpack = require('webpack')
const webpackconfig = require('./webpack.config.js')
const webpackstream = require('webpack-stream')
   

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "build"
    },
    port: 3000
  });
  done();
}

// Clean dist
function clean() {
  return del(['dist']);
}

// Copy assets
function copyAssets(){
  return gulp
    .src('build/assets/**/*')
    .pipe(gulp.dest('dist/assets'))
}

// Copy html
function copyHTML(){
  return gulp
    .src('build/*.html')
    .pipe(gulp.dest('dist/pages'))
}

// Copy fonts 
function copyFonts() {
  return gulp
    .src('src/assets/fonts/*')
    .pipe(gulp.dest('build/assets/fonts'))
}

// Optimize Images
function images() {
  return gulp
    .src('src/assets/images/**/*')
    .pipe(newer('build/assets/images'))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest('build/assets/images'))  
}  

// Convert images to webp
function imagesWebp() {
  return gulp
  .src('src/assets/images/**/*.{jpg,png}')
  .pipe(
    webp({
      quality:75,
      preset: 'photo',
      method: 6
    })
  )
  .pipe(gulp.dest('build/assets/images'))
}
 
// CSS task
function css() {
  return gulp
    .src('src/assets/scss/*.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('build/assets/css'))
    .pipe(browsersync.stream())
}

// Lint scripts
function scriptsLint() {
  return gulp
    .src(['src/assets/js/*', './gulpfile.js'])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
      .src(['src/assets/js/**/*'])
      .pipe(plumber())
      .pipe(webpackstream(webpackconfig, webpack))
      .pipe(gulp.dest('build/assets/js'))
      .pipe(browsersync.stream())
  ) 
}

// HTML task
function html(){
  return gulp
    .src(['src/templates/**/*.html', '!src/templates/partials/**'])
		.pipe(nunjucks({searchPaths: ['src/templates/']}))
		.pipe(gulp.dest('build'))
		.pipe(browsersync.stream())
}

// Watch files
function watchFiles() {
  gulp.watch('src/assets/scss/**/*.scss', css) 
  gulp.watch('src/assets/js/*', gulp.series(scriptsLint,scripts))
  gulp.watch('src/templates/**/*.html', html) 
  gulp.watch('src/assets/images/**/*', images)
}

const js = gulp.series(scriptsLint,scripts)
const build = gulp.series(clean,copyAssets,copyHTML)
const watch = gulp.parallel([watchFiles,browserSync,css,scripts,html,images,copyFonts])

exports.images = images
exports.imagesWebp = imagesWebp
exports.css = css
exports.html = html
exports.js = js
exports.clean = clean
exports.build = build
exports.watch = watch
