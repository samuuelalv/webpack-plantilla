const HtmlWebPack = require("html-webpack-plugin");

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
    ],
  },

  optimization: {},

  plugins: [
    new HtmlWebPack({
      title: "mi webpack App",
      template: "./src/index.html",
    }),
  ],
};
