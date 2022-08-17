const HtmlWebPack = require("html-webpack-plugin");
const miniCssExtract = require("mini-css-extract-plugin");
const Copy = require("copy-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");
module.exports = {
  mode: "production",

  output: {
    clean: true,
    filename: "main.[contenthash].js",
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
      {
        test: /\.css$/,
        exclude: /styles.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles.css$/,
        use: [miniCssExtract.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "file-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizer(), new Terser()],
  },

  plugins: [
    new HtmlWebPack({
      title: "mi webpack App",
      template: "./src/index.html",
    }),
    new miniCssExtract({
      filename: "[name].[fullhash].css",
      ignoreOrder: false,
    }),
    new Copy({
      patterns: [{ from: "src/assets/", to: "assets/" }],
    }),
  ],
  devServer: {
    watchFiles: ["src/*.html"],
    hot: true,
  },
};
