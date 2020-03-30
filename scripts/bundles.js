const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WorkerPlugin = require("worker-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const srcPath = path.resolve(__dirname, "..", "src");
const distPath = path.resolve(__dirname, "..", "dist");

const plugins = [
  new CopyPlugin([
    {
      from: path.resolve(srcPath, "index.html"),
      to: path.resolve(distPath, "index.html"),
    },
  ]),
  new WorkerPlugin({ globalObject: "self" }),
];

const baseConfig = {
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

const configureLoaders = ({ isModern }) => {
  const babelLoaderConfig = {
    loader: "babel-loader",
    options: {
      babelrc: false,
      exclude: [/core-js/, /regenerator-runtime/],
      presets: [
        [
          "@babel/preset-env",
          {
            bugfixes: isModern,
            targets: {
              esmodules: isModern,
            },
          },
        ],
        "@babel/preset-typescript",
      ],
    },
  };
  return [
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
        babelLoaderConfig,
      ],
    },
    {
      test: /\.ts$/,
      use: babelLoaderConfig,
    },
  ];
};

const modernConfig = Object.assign({}, baseConfig, {
  entry: {
    main: `${srcPath}/index.ts`,
  },
  output: {
    path: distPath,
    filename: "main.mjs",
    chunkFilename: "[name].[id].[contenthash].js",
  },
  module: {
    rules: configureLoaders({ isModern: true }),
  },
});

const legacyConfig = Object.assign({}, baseConfig, {
  entry: {
    main: `${srcPath}/nomodule.ts`,
  },
  output: {
    path: distPath,
    filename: "main.es5.js",
    chunkFilename: "[name].[id].[contenthash].es5.js",
  },
  module: {
    rules: configureLoaders({ isModern: false }),
  },
});

function createCompiler(config) {
  const compiler = webpack(config);
  return () => {
    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) return reject(err);
        console.log(stats.toString({ colors: true }) + "\n");
        resolve();
      });
    });
  };
}

module.exports = {
  modernConfig,
  legacyConfig,
  bundle: async () => {
    await Promise.all([
      createCompiler(modernConfig)(),
      createCompiler(legacyConfig)(),
    ]);
  },
};
