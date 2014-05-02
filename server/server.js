// Node.js jaws server
// To learn more about configuring jaws, see: https://npmjs.org/package/jaws
var jaws = require('jaws')
var path = require('path')
var LevelREST = require('level-rest')
var levelup = require('level')
var mkdirp = require('mkdirp')
var JSONStream = require('JSONStream')
var through = require('through')

module.exports = function(options, done) {
  options = options || {}
  options.port = options.port = process.env.PORT || 8000
  options.host = options.host = process.env.HOST || '0.0.0.0'
  options.base = options.base || path.resolve(__dirname, '..', 'dist')
  options.db = options.db || path.join(__dirname, '..', 'dist_server', 'db')

  // Create db folder
  mkdirp.sync(path.dirname(options.db))

  // Create a REST interface to our LevelDB
  var rest = new LevelREST(levelup(options.db, {valueEncoding: 'json'}))

  //rest.post('notes', { id: 1, title: 'This is my title' }, {}, function() {})

  // Create a server
  var app = jaws()
  app.httpServer.listen(options.port, options.host, done)

  // API endpoints
  app.route('/api/:endpoint/:id?', function(req, res) {
    var id = req.route.params.id || ''
    var endpoint = req.route.params.endpoint
    var method = req.method.toLowerCase()

    var s = rest[method](endpoint + '/' + id)
    s.on('data', function(buf) {
      res.json(buf)
    })

    // :'{ I wish this worked
    //req.pipe(rest[method](endpoint + '/' + id)).pipe(res)
  }).nocache()

  // Route to reload the app
  //app.route('/_reload', require('./reload')(options))

  // Serve static files from the base folder
  app.route('/')
    .nocache()
    .file(path.join(options.base, 'index.html'))
  app.route('/*')
    .nocache()
    .files(options.base)

  return app
}

// Whether to start the server automatically: node server.js start
if (process.argv[2] === 'start') {
  var app = module.exports({}, function() {
    var address = app.httpServer.address()
    console.log('Server started at: ' + address.address + ':' + address.port)
  })
}
