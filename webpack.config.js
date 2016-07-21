const path = require('path');
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;
const webpack = require('webpack');

//plugins

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const precss       = require('precss');
const autoprefixer = require('autoprefixer');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};


process.env.BABEL_ENV = TARGET;


const common = {

  // Entry accepts a path or an object of entries. We'll be using the
  // latter form given it's convenient with more complex configurations.
  entry: {
    app: PATHS.app
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  }
};


// Default configuration. We will return this if
// Webpack is called outside of npm.
if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devServer: {
      contentBase: PATHS.build,

      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      //
      // If you use Vagrant or Cloud9, set
      // host: process.env.HOST || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices unlike default
      // localhost
      host: process.env.HOST,
      // port: process.env.PORT
      port: 5656
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'eval-source-map',

    module: {
      loaders: [
        {
          // Test expects a RegExp! Note the slashes!
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass'],
          // Include accepts either a path or an array of paths.
          include: PATHS.app
        },
        {
          test: /\.jsx?$/,
          // Enable caching for improved performance during development
          // It uses default OS directory by default. If you need something
          // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
          loaders: ['babel?cacheDirectory'],
          // Parse only app files! Without this it will go through entire project.
          // In addition to being slow, that will most likely result in an error.
          include: PATHS.app
        },
        {
          test: /\.(jpg|png)$/,
          loader: 'url?limit=200',
          include: PATHS.app

        }
      ]
    },

    postcss: function () {
        return [precss, autoprefixer({ browsers: ['last 2 versions'] })];
    }
  });
}

if(TARGET === 'build' || TARGET === 'stats') {
  module.exports = merge(common, {
    plugins: [
      new HtmlWebpackPlugin({
        template: 'node_modules/html-webpack-template/index.ejs',
        title: 'Kanban app',
        appMountId: 'app',
        inject: false
      }),
      new ExtractTextPlugin('styles.css', {
        allChunks: true
      }),
      new CleanPlugin([PATHS.build]),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ],

    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass'),
          include: PATHS.app
        },
        // {
        //   // Test expects a RegExp! Note the slashes!
        //   test: /\.scss$/,
        //   loaders: ['style', 'css', 'sass'],
        //   // Include accepts either a path or an array of paths.
        //   include: PATHS.app
        // },
        {
          test: /\.jsx?$/,
          // Enable caching for improved performance during development
          // It uses default OS directory by default. If you need something
          // more custom, pass a path to it. I.e., babel?cacheDirectory=<path>
          loaders: ['babel?cacheDirectory'],
          // Parse only app files! Without this it will go through entire project.
          // In addition to being slow, that will most likely result in an error.
          include: PATHS.app
        },
        {
          test: /\.(jpg|png)$/,
          // loader: 'url?limit=200',
          loader: "url-loader?limit=5000&name=img/img-[name]-[hash:6].[ext]",
          include: PATHS.app
        }
      ]
    }

  });
}
