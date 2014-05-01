// Grunt task for starting the server
module.exports = function(grunt) {
  var path = require('path');
  var sockets = [];
  var app = null;
  grunt.registerTask('server', 'Starts the node server', function() {
    var name = this.name;
    var done = this.async();
    var options = this.options();
    if (app) {
      grunt.log.ok('Restarting server...');
      app.httpServer.close(function() {
        app = null;
        grunt.task.run(name);
        done();
      });
      for (var i = 0; i < sockets.length; i++) {
        sockets[i].destroy();
      }
    } else {
      var script = path.join(process.cwd(), options.script)
      delete require.cache[require.resolve(script)];
      var server = require(script);
      app = server(options, function() {
        var address = app.httpServer.address();
        grunt.log.ok('Server started at: http://' + address.address + ':' + address.port);
        done();
      });
      app.httpServer.on('connection', function(socket) {
        sockets.push(socket);
      });
    }
  });
};
