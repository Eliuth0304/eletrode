return {
  name: "application-name",
  version: "0.0.1",
  description: "Isomorphic React Application With NodeJS backend",
  homepage: "",
  author: {},
  contributors: [],
  files: ["config", "src", "lib", "dist"],
  main: "lib/server/index.js",
  keywords: [],
  repository: {},
  license: "ISC",
  engines: {
    node: ">= 8",
    npm: ">= 5"
  },
  scripts: {
    build: "clap build",
    "prod-start": "NODE_ENV=production clap -n -x electrode/build prod",
    start: 'if test "$NODE_ENV" = "production"; then npm run prod-start; else clap dev; fi',
    test: "clap check",
    coverage: "clap check",
    prod: "echo 'Starting standalone server in PROD mode'; NODE_ENV=production node ./lib/server/",
    "heroku-postbuild": "clap build", //<% if (isSingleQuote) { %>
    install: "clap ?fix-generator-eslint" //<% } %>
  },
  dependencies: {
    bluebird: "^3.4.6",
    "electrode-archetype-react-app": "^5.0.0",
    "electrode-confippet": "^1.0.0",
    "electrode-react-webapp": "^2.1.0",
    "electrode-redux-router-engine": "^2.0.0", //<% if (isHapi) { %>
    "electrode-server": "^1.0.0",
    "electrode-static-paths": "^1.0.0", //<% } else if (isExpress) { %>
    express: "^4.0.0", //<% } else { %>
    koa: "^1.2.4",
    "koa-router": "^5.4.0",
    "koa-send": "^3.2.0",
    "koa-static": "^2.0.0", //<% } if (isPWA) { %>
    "react-notify-toast": "^0.4.1", //<% } if (isAutoSSR) {%>
    "electrode-auto-ssr": "^1.0.0", //<% } %>
    lodash: "^4.17.10",
    "react-router-config": "^1.0.0-beta.4",
    "react-router-dom": "^4.3.1"
  },
  devDependencies: {
    "electrode-archetype-react-app-dev": "^5.0.0"
  }, //<% if (isSingleQuote) { %>
  eslintConfig: {
    rules: {
      quotes: [2, "single"]
    }
  } //<% } %>
};
