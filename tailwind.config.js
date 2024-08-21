/** @type {import('tailwindcss').Config} */
import tailwindTypography from '@tailwindcss/typography'
import withMT from "@material-tailwind/html/utils/withMT";

module.exports = withMT({
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
