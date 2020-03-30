const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
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

const configureBabelLoader = ({ isModern }) => {
  return {
    test: /\.ts$/,
    use: {
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
    },
  };
};

const modernConfig = Object.assign({}, baseConfig, {
  entry: {
    main: `${srcPath}/index.ts`,
  },
  output: {
    path: distPath,
    filename: "main.mjs",
  },
  module: {
    rules: [configureBabelLoader({ isModern: true })],
  },
});

const legacyConfig = Object.assign({}, baseConfig, {
  entry: {
    main: `${srcPath}/nomodule.ts`,
  },
  output: {
    path: distPath,
    filename: "main.es5.js",
  },
  module: {
    rules: [configureBabelLoader({ isModern: false })],
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
