import { defineStore } from 'pinia';
import { ref, watch, toRefs } from 'vue';
import { useAuthenticator } from '@aws-amplify/ui-vue';
import { useUserStore } from './user';
import { signOut } from 'aws-amplify/auth';

export const useAuthStore = defineStore('auth', () => {
  const jwt = ref(null);
  const userAttributes = ref(null);
  const userStore = useUserStore();
  const isAuthenticated = ref(false);

  // Called from middlware/auth.js to kick off the auth/user hydration process.
  const setJwt = (token) => {
    jwt.value = token;
    isAuthenticated.value = true;
  };

  const signOutUser = async () => {
    signOut();
    userStore.reset();
    jwt.value = null;
    userAttributes.value = null;
    isAuthenticated.value = false;
    await navigateTo('/');
  };

  watch(jwt, async (newJwt) => {
    if (newJwt) {
      userStore.setJwt(newJwt);
      console.log('jwt', newJwt, userAttributes.value)
    }
  });

  return { signOutUser, setJwt, jwt, isAuthenticated };
});
