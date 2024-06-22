import { defineStore } from 'pinia';
import { ref, watch, toRefs } from 'vue';
import { useAuthenticator } from '@aws-amplify/ui-vue';
import { useUserStore } from './user';


export const useAuthStore = defineStore('auth', () => {
  const { authStatus, user, signOut } = toRefs(useAuthenticator());
  const amplifySignout = signOut.value;
  const jwt = ref(null);
  const userAttributes = ref(null);
  const userStore = useUserStore();

  // Called from middlware/auth.js to kick off the auth/user hydration process.
  const setJwt = (token) => {
    jwt.value = token;
  };

  watch(jwt, async (newJwt) => {
    if (newJwt) {
      userStore.setJwt(newJwt);
      console.log('jwt', newJwt, userAttributes.value)
    }
  });

  return { authStatus, setJwt, jwt, amplifySignout };
});
