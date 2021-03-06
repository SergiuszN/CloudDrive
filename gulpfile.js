var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notifier = require('node-notifier');
var path = require('path');

var notify = function(title, message){
    notifier.notify({
      title: title,
      message: message,
      sound: true,
      wait: false
    }, function (err, response) {
      console.log(err);
    });
};

gulp.task('sass:build', function(done){
    var s = sass();

    s.on('error', function(err){
        notify('Sass error', path.relative(__dirname, err.filename) + ":" + err.lineno)
        s.end();
    });

    return gulp.src('./src/CloudDriveBundle/Resources/public/sass/index.scss').
            pipe(s).pipe(gulp.dest('./web/bundles/clouddrive/css'))
});

gulp.task('sass:watch', function () {
    watch('./src/CloudDriveBundle/Resources/public/sass/**/*', function(events, done) {
        gulp.start('sass:build');
    });
});

gulp.task('scripts:watch', function () {
    watch(['./src/CloudDriveBundle/Resources/public/js/**/*'], function(events, done) {
        gulp.start('scripts:build');
    });
});

gulp.task('scripts:build', function(){
    var scripts = {
        vendor: [
            './src/CloudDriveBundle/Resources/public/vendor/js/jquery-3.1.1.min.js',
            './src/CloudDriveBundle/Resources/public/vendor/js/bootstrap.min.js',
            './src/CloudDriveBundle/Resources/public/vendor/js/highlight.pack.js',
        ],
        local: [
            './src/CloudDriveBundle/Resources/public/js/favorites_cookie.js',
            './src/CloudDriveBundle/Resources/public/js/file_loader/file_viewer.js',
            './src/CloudDriveBundle/Resources/public/js/file_loader/file_loader.js',
            './src/CloudDriveBundle/Resources/public/js/file_loader/progressbar.js',
            './src/CloudDriveBundle/Resources/public/js/file_loader/file_menu_events.js',
            './src/CloudDriveBundle/Resources/public/js/breadcrumb.js',
            './src/CloudDriveBundle/Resources/public/js/menu.js',
            './src/CloudDriveBundle/Resources/public/js/file_reader.js',
            './src/CloudDriveBundle/Resources/public/js/file_loader/favorites.js',
            './src/CloudDriveBundle/Resources/public/js/share_file.js',
        ]
    };

    var all = [];

    all.push.apply(all, scripts.vendor);
    all.push.apply(all, scripts.local);


    return gulp.src(all)
    .pipe(concat('scripts.js'))
    // .pipe(gulp.dest('./assets/js/'))
    .pipe(rename('scripts.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./web/bundles/clouddrive/js/'));
});


gulp.task('default', ['sass:build', 'scripts:build', 'sass:watch', 'scripts:watch']);
