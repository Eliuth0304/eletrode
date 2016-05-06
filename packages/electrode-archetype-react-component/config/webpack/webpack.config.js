"use strict";

const _ = require("lodash");
const path = require("path");

const babelConfig = require("./partial/babel.js");
const cssConfig = require("./partial/css.js");
const defineConfig = require("./partial/define.js");
const fontsConfig = require("./partial/fonts");
const imageConfig = require("./partial/images.js");
const jsonConfig = require("./partial/json.js");
const optimizeConfig = require("./partial/optimize.js");
const sourceMapsConfig = require("./partial/sourcemaps.js");
const stylusConfig = require("./partial/stylus.js");

const archetypeNodeModules = path.join(__dirname, "../../", "node_modules");
const archetypeDevNodeModules = path.join("../../dev/", "node_modules");

const baseConfiguration = {
  cache: true,
  debug: false,
  entry: path.join(process.cwd(), "src/index.js"),
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "bundle.min.js",
    libraryTarget: "umd"
  },
  resolve: {
    root: [archetypeNodeModules, archetypeDevNodeModules, process.cwd()],
    modulesDirectories: ["node_modules"],
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
    root: [archetypeNodeModules, process.cwd()]
  }
};

const createConfig = _.flowRight(
  babelConfig(),
  cssConfig(),
  defineConfig(),
  fontsConfig(),
  imageConfig(),
  jsonConfig(),
  optimizeConfig(),
  sourceMapsConfig(),
  stylusConfig()
);

module.exports = createConfig(baseConfiguration);
