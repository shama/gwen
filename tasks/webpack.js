module.exports = function(grunt) {
  var path = require('path');
  var DefinePlugin = require('webpack/lib/DefinePlugin');
  var IgnorePlugin = require('webpack/lib/IgnorePlugin');
  var UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;
  var CompressionPlugin = require("compression-webpack-plugin");

  // config helper for webpack
  var webpackConfig = function(entry, output) {
    var plugins = [
      // define global variables
      new DefinePlugin({
        PRODUCTION: !!grunt.option('production')
      }),
      // ignore certain files
      new IgnorePlugin(/\.(html|txt|DS_Store)$/)
    ];
    // if in production, additional optimizations
    if (grunt.option('production')) {
      plugins.push(new UglifyJsPlugin())
      plugins.push(new CompressionPlugin({
        asset: '{file}.gz',
        algorithm: 'gzip',
        regExp: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }));
    }

    return {
      // entry point of our app
      entry: path.resolve(__dirname, '..', entry),

      // where to output the build
      output: {
        path: path.dirname(output),
        filename: path.basename(output),
        publicPath: '/',
        sourceMapFilename: '[file].map',
      },

      // save stats to the grunt config for later use
      storeStatsTo: !!grunt.option('production') ? 'webpackstats' : null,

      // which loader to use based on extension
      module: {
        loaders: [
          { test: /\.coffee$/, loader: 'coffee' },
          { test: /\.hbs$/, loader: 'ember-templates' },
          { test: /\.styl$/, loader: 'style!raw!stylus' },
          { test: /\.css$/, loader: 'style!css' },
          // all svg,png,woff,eot,ttf,otf files but not raw.svg
          { test: /\.(svg|png|woff|eot|ttf|otf)$/, loader: 'url?limit=100000' },
        ],
      },

      resolve: {
        // search these vendor folders for modules
        modulesDirectories: ['web_modules', 'node_modules'],
        // preference these extensions in this order
        extensions: ['', '.js', '.coffee'],
        alias: {
          // whether to alias the production or development ember build
          'ember': 'ember/' + (grunt.option('production') ? 'ember.prod.js' : 'ember.js'),
          // ember-data prod/dev switch
          'ember-data': 'ember-data/' + (grunt.option('production') ? 'ember-data.prod.js' : 'ember-data.js'),
          // handlebars runtime/dev switch
          //'handlebars': 'handlebars/' + (grunt.option('production') ? 'handlebars.runtime.js' : 'handlebars.js'),
          // TODO: Fix this
          'handlebars': 'handlebars/handlebars.js',
        },
      },

      // turn on caching
      cache: true,

      // Enable source maps
      devtool: !!grunt.option('production') ? false : 'source-map',

      // create these common node.js variables
      node: {
        __dirname: true,
        __filename: true,
      },

      // create a module manifest
      recordsPath: path.join(path.dirname(output), 'records.json'),

      // plugins for webpack
      plugins: plugins,
    }
  }

  grunt.renameTask('webpack', 'webpack-renamed');
  grunt.registerMultiTask('webpack', function() {
    var cfg = {}
    cfg[this.target] = webpackConfig(this.data.entry, this.data.output);
    grunt.config('webpack-renamed', cfg);
    grunt.task.run('webpack-renamed:' + this.target);
  });
};
