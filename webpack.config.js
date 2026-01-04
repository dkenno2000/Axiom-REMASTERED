const path = require("path");

module.exports = {
  mode: "production", // Change to "development" if needed
  devtool: "source-map", // recheck...
  devtool: true,
  entry: "./src/remastered.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "remastered.bundle.js"
  },
  target: "web", // Ensure it's targeting web for a browser environment
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // fixed
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  module: {
    rules: [
      {
        test: /lightweight-charts\.standalone\.production\.js$/, // tv lightweight charts bundling
        loader: 'exports-loader',
        options: {
          exports: {
            LightweightCharts: 'LightweightCharts',
            createChart: ['LightweightCharts', 'createChart']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'lightweight-charts': path.resolve(__dirname, 'node_modules/lightweight-charts/dist/lightweight-charts.standalone.production.js')
    }
  }
};



