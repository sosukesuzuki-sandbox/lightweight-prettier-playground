const { bundle } = require("./bundles");

async function build() {
  await bundle();
}

build();
