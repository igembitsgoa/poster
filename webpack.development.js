const path = require("path");
var HTMLWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "none", // avoid eval statements
  mode: "development",
  plugins: [
    new HTMLWebpackPlugin({
      filename: "Poster/index.html",
      template: "./src/index.pug",
      chunks: ["index"],
    }),
    new ExtractCssChunks(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [ExtractCssChunks.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|ttf|woff2|woff|eot|mp4|pdf|xlsx|zip)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              context: path.resolve(__dirname, "src/"),
              outputPath: ".",
              publicPath: ".",
              useRelativePaths: true,
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      }
    ],
  },
};
