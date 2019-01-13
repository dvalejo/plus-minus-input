const path = require("path");

module.exports = {
  entry: "./src/counter.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "counter.js",
    path: path.resolve(__dirname, "dist")
  },
};