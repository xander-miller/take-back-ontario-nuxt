import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from './user';
import { signOut } from 'aws-amplify/auth';

export const useAuthStore = defineStore('auth', () => {
  const jwt = ref(null);
  const userAttributes = ref(null);
  const userStore = useUserStore();
  const isAuthenticated = ref(false);

  // Called from middlware/auth.js to kick off the auth/user hydration process.
  const setJwt = async (token) => {
    console.log('Setting JWT in auth store:', token);
    jwt.value = token;
    isAuthenticated.value = true;
    await userStore.initializeUser(token);
  };

  const signOutUser = async () => {
    signOut();
    userStore.reset();
    jwt.value = null;
    userAttributes.value = null;
    isAuthenticated.value = false;
    await navigateTo('/');
  };

  return { signOutUser, setJwt, jwt, isAuthenticated };
});
