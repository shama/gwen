module.exports = ->
  # Always turn on stack traces
  @option('stack', true)

  # entry tasks (can be ran with grunt <taskname>)
  @registerTask 'default', 'Compile the site',
    ['clean', 'webpack:dist', 'copy:dist']
  @registerTask 'dev', 'Run to compile and start the dev server to work',
    ['default', 'server', 'watch']
  @registerTask 'test', 'Run the test suite with phantomjs',
    ['default', 'webpack:test', 'copy:test', 'webpack', 'server', 'qunit']
  @registerTask 'sauce', 'Run the test suite on sauce labs',
    ['test', 'saucelabs-qunit']
  @registerTask 'docs', 'Generate API docs to http://localhost:8000/docs',
    ['default', 'yuidoc', 'connect:server:keepalive']
  @registerTask 'metrics', 'Generate web perf metrics to metrics/index.html',
    ['default', 'server', 'phantomas']

  @initConfig
    # common config variables
    dist: 'dist'
    distDesktop: 'dist_desktop'
    src: 'src'
    test: 'test'
    pkg: @file.readJSON('package.json')
    webpackstats: hash: if !!@option('production') then '' else 'bundle'

    # config for removing files
    clean:
      options: force: true
      dist: '<%= dist %>'

    # config for copying files
    copy:
      options: processContent: @template.process
      dist:
        cwd: 'src/', src: '*.{html,txt}', dest: '<%= dist %>', expand: true, flatten: true
      test:
        cwd: 'test/', src: '*.{html,txt}', dest: '<%= dist %>', expand: true, flatten: true

    # config for module bundling
    webpack:
      dist:
        entry: 'src/index.js'
        output: '<%= dist %>/' + (if !!@option('production') then '[hash]' else 'bundle') + '.js'
      test:
        entry: 'test/tests.js'
        output: '<%= dist %>/tests.js'

    # node server script to run
    server: options:
      script: 'server/server.js'

    # config for qunit tests from cli
    qunit: test: options: urls: ['http://localhost:8000/test/index.html']

    # config for running tests on saucelabs
    'saucelabs-qunit': test: options:
      urls: ['http://localhost:8000/test/index.html']
      browsers: require('./test/browsers.coffee')
      testname: '<%= pkg.name %>'

    # config for generating docs
    yuidoc:
      dist:
        name: '<%= pkg.name %>'
        description: '<%= pkg.description %>'
        version: '<%= pkg.version %>'
        url: '<%= pkg.homepage %>'
        options:
          syntaxtype: 'coffee'
          extension: '.coffee'
          paths: '<%= src %>'
          outdir: '<%= dist %>/docs'

    # config for web perf metrics
    phantomas: dist: options:
      indexPath: 'metrics/'
      url: 'http://localhost:8000'

    # config for watching files
    watch:
      options: spawn: false
      lr:
        options: livereload: true
        files: ['<%= dist %>/**/*']
      jscss:
        files: ['<%= src %>/**/*.{coffee,hbs,js}', '<%= src %>/**/*.styl']
        tasks: ['webpack:dist', 'copy:dist', 'beep']
      html:
        files: ['<%= src %>/**/*.html']
        tasks: ['copy', 'beep']
      server:
        files: ['server/*.js']
        tasks: ['server', 'beep']
      tests:
        files: ['<%= test %>/**/*']
        tasks: ['webpack:test', 'copy:test', 'beep']
      gruntfile:
        files: ['Gruntfile.coffee', 'beep']

  # load npm installed tasks
  @loadNpmTasks(task) for task in require('matchdep').filterDev(['grunt-*', '!grunt-cli'])

  # load our local tasks
  @loadTasks 'tasks'
