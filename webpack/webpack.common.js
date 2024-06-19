const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: path.resolve(
    __dirname,
    "..",
    "./src/index.tsx",
  ) /* tell webpack where is the entry point */,
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      src: path.resolve(__dirname, "..", "./src"),
    },
  } /* resolve imports, it will first look for .tsx, then .ts, and then .js */,
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  } /* define module rules */,
  output: {
    path: path.resolve(__dirname, "..", "./build"),
    filename: "bundle.js",
  } /* where to store all the build files */,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./src/index.html"),
    }),
    new Dotenv({
      path: path.resolve(__dirname, "..", "./.env"), // Path to .env file (this is the default)
      systemvars: true, // Load system environment variables as well
    }),
  ] /* define plugins */,
};
