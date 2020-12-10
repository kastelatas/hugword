/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const withPlugins = require('next-compose-plugins');
const withVideos = require('next-videos')
const withFonts = require('next-fonts')
const withImages = require('next-images')

const ENV_VARS = {
  SITE_NAME: process.env.SITE_NAME,
  API_URL: process.env.API_URL,
  API_DEV_HOST: process.env.API_DEV_HOST,
  API_IMG_URL: process.env.API_IMG_URL,
}

module.exports = withPlugins([
  [withFonts],
  [withVideos],
  [withImages],
  {
    env: ENV_VARS,
    publicRuntimeConfig: ENV_VARS,
    poweredByHeader: false,
  },
  {
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
  },
  { distDir: 'build' },
])