export default defineNuxtConfig({
  // Specify modules, including `@nuxt/content`
  modules: [
    '@nuxt/content'
  ],

  content: {
    documentDriven: true
  },

  // Define global CSS
  css: [
    // Your CSS files here
  ],

  // Build Configuration
  build: {
    // Your build options here
  },

  // Additional configurations...

  // Netlify deployment settings
  nitro: {
    preset: 'netlify'
  }
});
