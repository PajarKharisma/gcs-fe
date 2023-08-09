const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

const nextConfig = {
  images: {
    disableStaticImages: true
  }
}

module.exports = withPlugins(
  [
    nextEnv({
      staticPrefix: 'NEXT_STATIC_',
      publicPrefix: 'NEXT_PUBLIC_',
    }),
    withImages()
  ], nextConfig
);