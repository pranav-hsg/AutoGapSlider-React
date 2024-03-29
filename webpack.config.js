
const path= require ("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, "/dist"), // the bundle output path
    filename: "index.js", // the name of the bundle
    libraryTarget:"umd",
    library:"AutoGapSlider"
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: "src/index.html", // to import index.html file inside index.js
    // }),
  ],
  devServer: {
    port: 3030, // you can change the port
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource',
      // },
      // {
      //   test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
      //   loader: "url-loader",
      //   options: { limit: false },
      // },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/inline',  
      },
    ],
  },
  externals:{
    react:'react'
  }
};