const gulp = require('gulp')
var gulpCopy = require('gulp-copy')
var electron = require('gulp-electron')
var packageJson = require('./package.json')

// Copying semantic-ui to src.
var sourceFiles = [ 'semantic/dist/**/*' ]
var destination = 'src/renderer/styles/'
gulp.task('copy-assets', function () {
  return gulp
    .src(sourceFiles)
    .pipe(gulp.dest(destination))
})

gulp.task('electron', function () {
  gulp.src('')
    .pipe(electron({
      src: './src',
      packageJson: packageJson,
      release: './release',
      cache: './cache',
      version: 'v1.4.14',
      packaging: true,
        // platforms: ['win32-ia32', 'darwin-x64'],
      platforms: ['darwin-x64'],
      platformResources: {
        darwin: {
          CFBundleDisplayName: packageJson.name,
          CFBundleIdentifier: packageJson.name,
          CFBundleName: packageJson.name,
          CFBundleVersion: packageJson.version,
          icon: 'assets/youribot.icns'
        }
            // win: {
            //     "version-string": packageJson.version,
            //     "file-version": packageJson.version,
            //     "product-version": packageJson.version,
            //     "icon": 'assets/logo.png.ico'
            // }
      }
    }))
    .pipe(gulp.dest(''))
})

// Default Task
gulp.task('default', ['copy-assets'])
