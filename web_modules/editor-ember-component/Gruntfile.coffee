module.exports = ->

  @registerTask 'default', ['clean', 'webpack:example', 'webpack:test']
  @registerTask 'dev', ['default', 'connect', 'watch']
  @registerTask 'test', ['default', 'connect', 'qunit']
  @registerTask 'sauce', ['test', 'saucelabs-qunit']

  webpack = require('./webpack.config.coffee')

  @initConfig
    pkg: @file.readJSON('package.json')

    clean: ['.tmp']

    webpack:
      example: webpack('test/example.js', '.tmp/example.js')
      test: webpack('test/test.js', '.tmp/test.js')

    connect: test: options: base: ['.tmp', 'test']

    qunit: test: options:
      urls: ['http://localhost:8000/test.html']

    'saucelabs-qunit': test: options:
      urls: ['http://localhost:8000/test.html']
      #browsers: require('./test/browsers.coffee')
      testname: '<%= pkg.name %>'

    # watch files and run tasks upon changes
    watch:
      options: spawn: false
      tests:
        options: livereload: true
        files: ['test/**/*', 'index.{coffee,hbs}']
        tasks: ['default']
      gruntfile:
        files: ['Gruntfile.coffee', 'webpack.config.coffee']

  # load all grunt-* tasks
  @loadNpmTasks(task) for task in require('matchdep').filterDev(['grunt-*', '!grunt-cli'])
