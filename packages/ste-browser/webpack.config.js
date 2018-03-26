var webpack = require('webpack');

var output = {
  path: __dirname + '/dist',
  libraryTarget: 'umd',
  umdNamedDefine: false
};

module.exports = [
  {
    entry: {
      'ste-core': './src/ste-core.js',
    },
    output: output,
    devtool: 'source-map'
  },
  {
    entry: {
      'ste-events': './src/ste-events.js',
      'ste-signals': './src/ste-signals.js',
      'ste-simple-events': './src/ste-simple-events.js'
    },
    output: output,
    externals: [
      'ste-core'
    ],
    devtool: 'source-map'
  },
  {
    entry: {
      'strongly-typed-events': './src/strongly-typed-events.js'
    },
    output: output,
    externals: [
      'ste-core',
      'ste-events',
      'ste-signals',
      'ste-simple-events'
    ],
    devtool: 'source-map'
  }
];