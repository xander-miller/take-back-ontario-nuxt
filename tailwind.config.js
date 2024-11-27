/** @type {import('tailwindcss').Config} */
import tailwindTypography from '@tailwindcss/typography'
import withMT from "@material-tailwind/html/utils/withMT";
const defaultTheme = require('tailwindcss/defaultTheme')


module.exports = withMT({
theme: {
  extend:{
    colors:{
      tboblue: {
        DEFAULT: '#3494c4',
        '50': '#eff8fc',
        '100': '#d7eef6',
        '200': '#b3dcee',
        '300': '#7fc2e1',
        '400': '#3494c4',
        '500': '#2782b3',
        '600': '#236997',
        '700': '#23567b',
        '800': '#244966',
        '900': '#223d57',
        '950': '#12273a',
      },
      tbored: {
        DEFAULT: '#b6362d',
        '50': '#fdf4f3',
        '100': '#fbe6e5',
        '200': '#f9d2cf',
        '300': '#f4b2ad',
        '400': '#ec847d',
        '500': '#e05c53',
        '600': '#cc4036',
        '700': '#b6362d',
        '800': '#8e2d26',
        '900': '#762b26',
        '950': '#40120f',
      }
    },
    fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
  }
},
  corePlugins: {
    preflight: true,
  },
  plugins: [
    tailwindTypography,
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
});
