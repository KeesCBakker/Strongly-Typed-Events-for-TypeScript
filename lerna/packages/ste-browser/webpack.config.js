var webpack = require('webpack');


module.exports = [
  {
    entry: {
      'ste-core': './src/ste-core.js',
      'strongly-typed-events': './src/strongly-typed-events.js',
      'ste-events': './src/ste-events.js',
      'ste-signals': './src/ste-signals.js',
      'ste-promise-signals': './src/ste-promise-signals.js',
      'ste-simple-events': './src/ste-simple-events.js'
    },
    output: {
      path: __dirname + '/dist',
      libraryTarget: 'umd',
      umdNamedDefine: false,
      filename: '[name].min.js'
    },
    devtool: 'source-map',
    optimization: {
      minimize: true
    }
  },
  {
    entry: {
      'ste-core': './src/ste-core.js',
      'strongly-typed-events': './src/strongly-typed-events.js',
      'ste-events': './src/ste-events.js',
      'ste-signals': './src/ste-signals.js',
      'ste-promise-signals': './src/ste-promise-signals.js',
      'ste-simple-events': './src/ste-simple-events.js'
    },
    output: {
      path: __dirname + '/dist',
      libraryTarget: 'umd',
      umdNamedDefine: false,
      filename: '[name].js'
    },
    devtool: 'source-map',
    optimization: {
      minimize: false
    }

  }
];