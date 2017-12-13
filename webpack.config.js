var path = require('path');
var webpack = require('webpack');

// module.exports = {
//   entry: "./CFW/Main.js",
//   output: {
//     path: __dirname,
//     filename: "build/CFW.min.js"
//   },
//   module: {
//     loaders: [{
//       test: path.join(__dirname, 'es6'),
//       loader: 'babel-loader',
//       query: {
//         presets: ['es2015']
//       }
//     }]
//   },
//   plugins: [

//   ]
// }
//
module.exports = {
  entry: "./lib/main/main.js",
  output: {
    path: __dirname,
    filename: "build/game.min.js"
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'es6'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [

  ]
}