const webpack = require("webpack");
const _ = require("lodash");
const base = require("./webpack.config.demo.dev");

// Update our own module version.
const mod = _.cloneDeep(base.module);
// First loader needs react hot.
mod.loaders[0].loaders = ["react-hot"].concat(mod.loaders[0].loaders);
base.devServer.hot = true;

module.exports = _.merge({}, _.omit(base, "entry", "module"), {
  entry: {
    app: [
      `webpack-dev-server/client?http://0.0.0.0:${process.env.WEBPACK_DEVSERVER_PORT || "4000"}`,
      "webpack/hot/only-dev-server",
      "./demo/demo.jsx"
    ]
  },

  module: mod,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ].concat(base.plugins)
});
