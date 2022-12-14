const HtmlWebPack = require("html-webpack-plugin");
const miniCssExtract = require("mini-css-extract-plugin");
const Copy = require("copy-webpack-plugin");

module.exports = {
  mode: "development",

  output: {
    clean: true,
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
    ],
  },

  optimization: {},

  plugins: [
    new HtmlWebPack({
      title: "mi webpack App",
      template: "./src/index.html",
    }),
    new miniCssExtract({
      filename: "[name].css",
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
