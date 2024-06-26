/** @type {import('tailwindcss').Config} */
import tailwindTypography from '@tailwindcss/typography'

const path = require('path');

// Assuming your Nuxt project's source files are in the project root directory
const srcDir = path.resolve(__dirname);

module.exports = {
theme: {
  extend:{
    colors:{
      tboblue: {
        DEFAULT: '#3494c4'
      },
      tbored: {
        DEFAULT: '#b6362d'
      }
    }
  }
},
  corePlugins: {
    preflight: true,
  },
  plugins: [
    tailwindTypography,
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
  ],
  content: [
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
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
