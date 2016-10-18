module.exports = {
  entry: './src/referral-tracker.js',
  output: {
    path: __dirname + '/build',
    filename: 'referral-tracker.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
};