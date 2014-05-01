module.exports = function(grunt) {
  var path = require('path');
  var exec = require('child_process').exec;

  var version = '0.8.3';

  grunt.registerTask(
    'desktop', 'Compiles a desktop version of the app for Linux, Windows and OSX',
    ['clean:desktop', 'default', 'copy:desktop', 'nw-gyp', 'nodewebkit']
  );

  // Config for nodewebkit
  grunt.config('nodewebkit', {
    options: {
      version: version,
      build_dir: '<%= distDesktop %>',
      mac: true,
      win: true,
      linux32: true,
      linux64: true,
    },
    src: '<%= dist %>/**/*',
  });

  // Config for cleaning the desktop app
  grunt.config('clean.desktop', {
    src: '<%= distDesktop %>/releases/**/*',
  });

  // Config for copying the desktop/server node files
  grunt.config('copy.desktop', {
    files: [
      { cwd: 'desktop/', src: '**/*', dest: '<%= dist %>', expand: true },
      { cwd: 'server/', src: '**/*', dest: '<%= dist %>', expand: true },
    ]
  });

  grunt.registerTask('nw-gyp', function() {
    var done = this.async();
    var cmd = path.resolve(__dirname, '..', 'node_modules', '.bin', 'nw-gyp');
    exec(cmd + ' rebuild --target=' + version, function() {
      grunt.log.ok('Native addons rebuilt.');
      done();
    });
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
};
