module.exports = {
  entry: './src/index.js',
  output: {
    filename: './javascripts/bundle.js'
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  }
}
