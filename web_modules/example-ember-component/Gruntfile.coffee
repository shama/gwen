module.exports = ->

  @registerTask 'default', ['clean', 'webpack:example', 'webpack:test']
  @registerTask 'dev', ['default', 'connect', 'watch']
  @registerTask 'test', ['default', 'connect', 'qunit']
  @registerTask 'sauce', ['test', 'saucelabs-qunit']
  @registerTask 'prepublish', ['webpack:prepublish']

  webpack = require('./webpack.config.coffee')

  @initConfig
    pkg: @file.readJSON('package.json')

    clean: ['.tmp']

    webpack:
      example: webpack('test/example.coffee', '.tmp/example.js')
      test: webpack('test/test.coffee', '.tmp/test.js')
      prepublish: webpack('index.coffee', 'index.js')

    connect: test: options: base: ['test', '.tmp']

    qunit: test: options:
      urls: ['http://localhost:8000/test.html']

    'saucelabs-qunit': test: options:
      urls: ['http://localhost:8000/test.html']
      #browsers: require('./test/browsers.coffee')
      testname: '<%= pkg.name %>'

    watch:
      tests:
        options: livereload: true
        files: ['test/**/*', 'index.{coffee,hbs}']
        tasks: ['default']
      gruntfile:
        files: ['Gruntfile.coffee', 'webpack.config.coffee']

  @loadNpmTasks(task) for task in require('matchdep').filterDev(['grunt-*', '!grunt-cli'])
