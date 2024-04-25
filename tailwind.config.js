/** @type {import('tailwindcss').Config} */
import tailwindTypography from '@tailwindcss/typography'

const path = require('path');

// Assuming your Nuxt project's source files are in the project root directory
const srcDir = path.resolve(__dirname);

module.exports = {
theme: {
  extend:{
    colors:{
      tboBlue: {
        DEFAULT: '#3893C5',
        50: '#C6E0EF',
        100: '#B6D8EA',
        200: '#96C7E1',
        300: '#76B6D8',
        400: '#57A4CF',
        500: '#3893C5',
        600: '#2C7299',
        700: '#1F526E',
        800: '#133142',
        900: '#061116',
        950: '#000000'
      },
      tboRed: {
        DEFAULT: '#B5352C',
        50: '#EBB1AD',
        100: '#E7A29D',
        200: '#DF837C',
        300: '#D7645B',
        400: '#CF443B',
        500: '#B5352C',
        600: '#882821',
        700: '#5B1B16',
        800: '#2E0D0B',
        900: '#000000',
        950: '#000000'
      }
    }
  }
},
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
