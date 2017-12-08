var gulp = require('gulp');
var babel = require('gulp-babel');
var babelify = require('babelify');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var removeHtmlComments  = require('gulp-remove-html-comments');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var buffer = require("vinyl-buffer");

// Config of project folders
var config = {
  desDir: './dist' /* répértoire de destination (prod) */
}

// Task to build JS files
gulp.task("build-js", function(){
 return browserify("./dev/app/app.js",{
    debug: true
  })
  .transform(babelify.configure({
    presets : ["env"]
  }))
  .bundle()
  .pipe(source("bundle.js"))
  .pipe(gulp.dest(config.desDir + '/js'))
  .pipe(reload({stream:true}));
});

// Task to copy html files
gulp.task("copy-html", function(){
  return gulp.src(['./dev/www/*.html'])
  .pipe(removeHtmlComments())
  .pipe(gulp.dest(config.desDir))
  .pipe(reload({stream:true}));
});

// 6: Copy static files from dev/src folder (but not bower_components + not *.css files) to build folders in dist/src folder
gulp.task("copyStaticFiles", function(){
    return gulp.src(["./dev/src/**/*.*", "!./dev/src/css{,/**}", "!./dev/src/bower_components{,/**}"])
    .pipe(gulp.dest(config.desDir + "/src"))
    .pipe(reload({stream:true}));
});

// Task to concat all JS dependencies in one JS file
gulp.task('js-dep', function(){
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/materialize-css/dist/js/materialize.min.js'
  ])
  .pipe(concat('js-deps.js'))
  .pipe(gulp.dest(config.desDir + '/js'))
})

// gulp.task('css-dep', function(){
//   return gulp.src([
//     'node_modules/materialize-css/dist/css/materialize.min.css'
//   ])
//   .pipe(concat('css-deps.css'))
//   .pipe(gulp.dest(config.desDir + '/src/css'))
// })

// Task to copy all fonts to ./dist/src/fonts
gulp.task('fonts-dep', function(){
  return gulp.src([
    'node_modules/materialize-css/dist/fonts/**/**.*'
  ])
  .pipe(gulp.dest(config.desDir + '/src/fonts'))
})

// Task to concat style.css with all *.css dependencies
gulp.task('css', function(){
  return gulp.src([
    "node_modules/materialize-css/dist/css/materialize.min.css",
    "./dev/src/css/*.*",
  ])
  .pipe(concat('style.css'))
  .pipe(gulp.dest(config.desDir + '/src/css'))
  .pipe(reload({stream:true}));
})

// uglify JS
gulp.task('compress', function(){
   return browserify({
     entries: './dev/app/app.js'
   })
   .transform(babelify.configure({
     presets : ["env"]
   }))
   .bundle()
   .pipe(source("bundle.js"))
   .pipe(buffer())
   .pipe(uglify())
   .pipe(gulp.dest(config.desDir + '/js'))

})
// Task to run local server
gulp.task("startServer",  function() {
  browserSync.init({
    server: {
        baseDir: config.desDir
    },
    notify: true
  });
});

// Task to watch wich file is changing
// and load the right task
gulp.task('watch', function() {
  // watch js file changes
  gulp.watch('./dev/app/**/*.js', ['build-js']); 
  // watch static files
  gulp.watch(["./dev/src/**/*.*", "!./dev/src/css/**.*", "!./dev/src/bower_components{,/**}"], ['copyStaticFiles']); 
  // watch css
  gulp.watch('./dev/src/css/*.*',['css']); 
  // watch all html template file changes
  gulp.watch('./dev/**/*.html', ['copy-html']); 
});

// task to run all task in parallel
gulp.task("run",[
  'build-js', // js files
  'copy-html', // html files
  'copyStaticFiles', // static fies
  'js-dep', // js dependencies files
  'css', // css files
  'fonts-dep' // fonts files
]);

gulp.task("prod",[
  'compress', // js files
  'copy-html', // html files
  'copyStaticFiles', // static fies
  'js-dep', // js dependencies files
  'css', // css files
  'fonts-dep' // fonts files
]);
// default gulp task runner
gulp.task('default', ['run'], function() {
    gulp.start('startServer', 'watch');
    // restart Gulp watch if new file added
    gulp.watch('src/**/*', {cwd: './dev/'}, function(event) {
      // console.log(event);
      if(event.type === 'added'){
        setTimeout(function() {
          gulp.start('watch')
        },1000)
      }
    })
});
