"use strict";

const basePlugins = [
  "@babel/plugin-transform-template-literals",
  "@babel/plugin-transform-function-name",
  "@babel/plugin-transform-arrow-functions",
  "@babel/plugin-transform-block-scoped-functions",
  "@babel/plugin-transform-classes",
  "@babel/plugin-transform-object-super",
  "@babel/plugin-transform-shorthand-properties",
  "@babel/plugin-transform-computed-properties",
  "@babel/plugin-transform-for-of",
  "@babel/plugin-transform-sticky-regex",
  "@babel/plugin-transform-unicode-regex",
  "@babel/plugin-transform-spread",
  "@babel/plugin-transform-parameters",
  "@babel/plugin-transform-destructuring",
  "@babel/plugin-transform-block-scoping",
  "@babel/plugin-transform-typeof-symbol",
  [
    "@babel/plugin-transform-regenerator",
    {
      async: false,
      asyncGenerators: false
    }
  ],
  "@babel/plugin-proposal-object-rest-spread",
  [
    "babel-plugin-i18n-id-hashing",
    {
      varsContainingMessages: ["defaultMessages", "translations"]
    }
  ],
  [
    "babel-plugin-react-intl",
    {
      messagesDir: "./tmp/messages/",
      enforceDescriptions: true
    }
  ],
  "transform-node-env-inline",
  "babel-plugin-lodash",
  "@babel/plugin-transform-runtime",
  "@babel/plugin-transform-flow-strip-types"
];

const { BABEL_ENV, NODE_ENV } = process.env;

const enableCssModule = process.env.ENABLE_CSS_MODULE === "true";
const isProduction = (BABEL_ENV || NODE_ENV) === "production";
const isTest = (BABEL_ENV || NODE_ENV) === "test";

const plugins = basePlugins.concat(
  // test env
  isTest && ["babel-plugin-dynamic-import-node"],
  // production env
  isProduction && [
    "@babel/plugin-transform-react-constant-elements",
    [
      "babel-plugin-transform-react-remove-prop-types",
      {
        removeImport: true
      }
    ]
  ],
  // css module support
  enableCssModule && [
    [
      "babel-plugin-react-css-modules",
      {
        context: "./src",
        generateScopedName: `${isProduction ? "" : "[name]__[local]___"}[hash:base64:5]`,
        filetypes: {
          ".scss": {
            syntax: "postcss-scss",
            plugins: ["postcss-nested"]
          },
          ".styl": {
            syntax: "sugarss"
          }
        }
      }
    ]
  ]
);

module.exports = {
  presets: [["@babel/preset-env", { loose: true }], "@babel/preset-react", "@babel/preset-flow"],
  plugins: plugins.filter(x => x)
};
