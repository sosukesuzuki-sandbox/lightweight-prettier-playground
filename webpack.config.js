const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WorkerPlugin = require("worker-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const srcPath = path.resolve(__dirname,  "src");
const distPath = path.resolve(__dirname, "dist");

const plugins = [
  new CopyPlugin([
    {
      from: path.resolve(srcPath, "index.html"),
      to: path.resolve(distPath, "index.html"),
    },
  ]),
  new WorkerPlugin({ globalObject: "self" }),
];

const isNoModule = process.env.BABEL_ENV === "nomodule";

module.exports = {
  entry: {
    main: `${srcPath}/index.ts`,
  },
  output: {
    path: distPath,
    filename: isNoModule ? "main.es5.js" : "main.mjs",
    chunkFilename: isNoModule
      ? "[name].[id].[contenthash].es5.js"
      : "[name].[id].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.w\.ts$/,
        use: [
          {
            loader: "worker-loader",
            options: {
              publicPath: process.env.ASSET_HOST || "/",
              inline: true,
            },
          },
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.ts$/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  mode: process.env.NODE_ENV || "development",
  devtool: "#source-map",
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.m?js(\?.*)?$/i,
        sourceMap: true,
        terserOptions: {
          safari10: true,
        },
      }),
    ],
  },
  plugins,
  resolve: {
    extensions: [".js", ".json", ".ts"],
  },
};
