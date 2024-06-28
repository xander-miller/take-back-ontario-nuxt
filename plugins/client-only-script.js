export default defineNuxtPlugin((nuxtApp) => {
  // These are for the Material Tailwind CSS framework. https://www.material-tailwind.com/
  // If loaded in nuxt.config.js, they throw errors due to SSR.
  if (import.meta.browser) {
    const scriptTabs = document.createElement('script');
    scriptTabs.src = 'https://unpkg.com/@material-tailwind/html@latest/scripts/tabs.js';
    scriptTabs.async = true;
    document.head.appendChild(scriptTabs);
    
    const scriptRipple = document.createElement('script');
    scriptRipple.src = 'https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js';
    scriptRipple.async = true;
    document.head.appendChild(scriptRipple);
  }
});