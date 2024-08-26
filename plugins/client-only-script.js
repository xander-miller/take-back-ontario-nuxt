export default defineNuxtPlugin((nuxtApp) => {
  // These are for the Material Tailwind CSS framework. https://www.material-tailwind.com/
  // If loaded in nuxt.config.js, they throw errors due to SSR.
  if (import.meta.client) {
    const loadClientSideScripts = () => {
      const scriptTabs = document.createElement('script');
      const interFont = document.createElement('script');
      scriptTabs.src = 'https://unpkg.com/@material-tailwind/html@latest/scripts/tabs.js';
      scriptTabs.async = true;
      interFont.src = 'https://rsms.me/inter/inter.css';
      interFont.async = true;
      document.head.appendChild(scriptTabs);
      document.head.appendChild(interFont);
    }
    window.addEventListener('load-client-side-scripts', loadClientSideScripts);
  }
});