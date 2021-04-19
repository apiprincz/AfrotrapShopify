require("dotenv").config();

// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = {
  env: {
    NEXT_PUBLIC_MONGO_URL: process.env.NEXT_PUBLIC_MONGO_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    STOREFRONT_ACCESS_TOKEN: process.env.STOREFRONT_ACCESS_TOKEN,
    DOMAIN: process.env.DOMAIN,
  },
  // experimental: { scriptLoader: true },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    return config;
  },

  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.node = {
  //     fs: "empty",
  //   };
  //
  // },
};
