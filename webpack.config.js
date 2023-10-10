const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const config = {
  entry: {
    // devpanel_add: path.resolve(__dirname, "./src/devtools/devpanel_add.ts"),
    devpanel: path.resolve(__dirname, "./src/devtools/devpanel.tsx"),
    content: path.resolve(__dirname, "./src/content/content.tsx"),
    page: path.resolve(__dirname, "./src/devtools/page.ts"),
    background: path.resolve(__dirname, "./src/devtools/background.ts"),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: 'inline-source-map', // isProduction? undefined : 'inline-source-map',
  devServer: {
    hot: true
  },
  optimization: {
    minimize: isProduction
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, "./src/devtools/devtools.ts"),
          to: path.join(__dirname, 'dist/devtools.js'),
        },
        {
          from: path.join(__dirname, "./src/devtools/index.html"),
          to: path.join(__dirname, 'dist/index.html'),
        },
        {
          from: path.join(__dirname, "./src/devtools/devtools.html"),
          to: path.join(__dirname, 'dist/devtools.html'),
        },
        {
          from: path.join(__dirname, "./src/manifest.json"),
          to: path.join(__dirname, 'dist/manifest.json'),
        },
      ],
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.scss$/,
        use: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/,
        use: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],
      },
      {
        test: /\.module\.(css|scss)$/i,
        use: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader", "sass-loader"],
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

module.exports = (env) => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
