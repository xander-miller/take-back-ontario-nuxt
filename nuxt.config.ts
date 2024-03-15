export default defineNuxtConfig({
  // Modules
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss"],
  vite: {
    optimizeDeps: {
      exclude: ['fsevents']
    }
  },
  content: {
    // It's important to check the latest documentation for @nuxt/content
    // as Nuxt 3's content handling strategies may have evolved.
    // The below configuration assumes compatibility and may need adjustments.
    documentDriven: true,
    contentHead: true,
    markdown: {
      // Ensure you have the necessary remark plugins installed
      // and configured according to the latest standards.
      remarkPlugins: [
        ["remark-gfm", false], // If you want to disable a plugin, this syntax might not be correct. Usually, you just omit it from the configuration.
        // For remark-oembed, ensure the plugin is installed and properly configured
        // The configuration shown here is a placeholder and should be replaced with actual options as needed.
        [
          "remark-oembed",
          {
            /* Options here */
          },
        ],
      ],
    },
  },

  // Global CSS
  css: ["~/assets/css/tailwind.css"],

  // PostCSS Configuration - Moved inside the build configuration
  build: {
    postcss: {
      // Directly define your PostCSS plugins here if needed
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  // Netlify deployment settings
  nitro: {
    preset: "netlify",
  },
});
