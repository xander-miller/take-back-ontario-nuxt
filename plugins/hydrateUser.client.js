import { useAuthStore } from '~/store/auth';

// This plugin is specified in nuxt.config.js to load in the client (for localStorage to work on browser)
export default defineNuxtPlugin((nuxtApp) => {
  if (!process.client) {
    throw new Error('This plugin is only allowed to run on the client; if you are seeing this error, it may not have been declared as a proper plugin in nuxt.config.js');
  }
  
  nuxtApp.hook('app:created', () => {
    const authStore = useAuthStore();
    const storedUserId = localStorage.getItem('storedUserId');
    if (storedUserId) {
      authStore.storedUserId = JSON.parse(storedUserId);
      console.log('UserId fetched from localStorage');
    }
  });
});
