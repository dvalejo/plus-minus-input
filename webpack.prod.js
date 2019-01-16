const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");
const merge = require("webpack-merge");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ],
        exclude: /node_modules/
      }
    ]
  },
});