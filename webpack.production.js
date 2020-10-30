const path = require("path");
var HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "none", // avoid eval statements
  plugins: [
    new HTMLWebpackPlugin({
      filename: "Poster/index.html",
      template: "./src/index.pug",
      chunks: ["index"],
    }),
    new ExtractCssChunks({
      filename: "css/[name].css",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              publicPath: "../",
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(svg|gif|ttf|woff2|woff|eot|mp4|pdf|xlsx|zip)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
            context: path.resolve(__dirname, "src/"),
            outputPath: ".",
            publicPath: "../",
            useRelativePaths: true,
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              context: path.resolve(__dirname, "src/"),
              outputPath: ".",
              publicPath: "../",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
};
