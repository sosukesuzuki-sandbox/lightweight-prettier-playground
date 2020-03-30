const webpack = require("webpack");
const Server = require("webpack-dev-server");
const { legacyConfig, modernConfig } = require("./bundles");

function createServerListen(config) {
  const compiler = webpack(config);
  const server = new Server(compiler);
  return () => {
    server.listen();
  };
}

module.exports = {
  devLegacy: createServerListen(legacyConfig),
  devModern: createServerListen(modernConfig),
};
