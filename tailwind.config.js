/** @type {import('tailwindcss').Config} */
import tailwindTypography from '@tailwindcss/typography'

const path = require('path');

// Assuming your Nuxt project's source files are in the project root directory
const srcDir = path.resolve(__dirname);

module.exports = {
  theme: {},
  corePlugins: {
    preflight: true,
  },
  plugins: [tailwindTypography],
  content: [
    'components/**/*.{vue,js,ts}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
    'App.{js,ts,vue}',
    'app.{js,ts,vue}',
    'Error.{js,ts,vue}',
    'error.{js,ts,vue}',
    'content/**/*.md'
  ],
};
