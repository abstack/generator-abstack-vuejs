var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWepackPlugin = require('html-webpack-plugin');

// basic configurations
module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    publicPath: '/',
    filename: 'static/js/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  module: {
    preLoaders: [
      {
        test: /\.(vue|js)$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js/,
        exclude: /node_modules|dist/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000
        }
      }
    ]
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('css'),
      less: ExtractTextPlugin.extract('css!less')
    }
  },
  plugins: [
    new ExtractTextPlugin("static/css/bundle.css")
  ]
};

// production configurations
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = module.exports.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWepackPlugin({
      filename: 'index.html',
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]);

  module.exports.vue.autoprefixer = {
    browsers: ['last 2 versions']
  }
} else {
  // development configurations
  module.exports.plugins = module.exports.plugins.concat([
    new HtmlWepackPlugin({
      filename: 'index.html',
      template: 'index.html'
    })
  ]);
  module.exports.devServer = {
    contentBase: './dist'
  };
  module.exports.devtool = '#source-map';
}
