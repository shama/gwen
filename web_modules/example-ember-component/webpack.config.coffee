module.exports = (entry, output) ->
  path = require('path')
  res =
    entry: path.resolve(__dirname, entry)
    output:
      path: path.dirname(output)
      filename: path.basename(output)
    module:
      loaders: [
        test: /\.coffee$/, loader: 'coffee-loader'
      ,
        test: /\.hbs$/, loader: 'ember-templates-loader'
      ,
        test: /\.css$/, loader: 'style-loader!css-loader'
      ,
        test: /\.styl$/, loader: 'style!raw!stylus'
      ]
    resolve:
      modulesDirectories: ['node_modules', 'bower_components']
      extensions: ['', '.coffee', '.js']
    node:
      __filename: true
      __dirname: true
