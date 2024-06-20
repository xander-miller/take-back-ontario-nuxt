import { defineStore } from 'pinia';
import { ref, computed, watch, toRefs } from 'vue';
import { useAuthenticator } from '@aws-amplify/ui-vue';
import { fetchUserAttributes } from '@aws-amplify/auth';
import { useUserStore } from './user';


export const useAuthStore = defineStore('auth', () => {
  const { authStatus, user, signOut } = toRefs(useAuthenticator());
  const amplifySignout = signOut.value;
  const cognitoId = ref(null);
  const jwt = ref(null);
  const userAttributes = ref(null);
  const userStore = useUserStore();

  // This may be overkill, but it may fail if some funny business is going on.
  const isAuthenticated = computed(() => !!cognitoId.value && !!jwt.value && !!user.value.userId && authStatus.value === 'authenticated' && cognitoId.value === user.value.userId);

  // Called from middlware/auth.js to kick off the auth/user hydration process.
  const setJwt = (token) => {
    jwt.value = token;
  };

  watch(jwt, async (newJwt) => {
    if (newJwt) {
      userAttributes.value = await fetchUserAttributes();
      console.log(userAttributes.value);
      console.log(user.value);
      cognitoId.value = userAttributes.value.sub;
      userStore.setId(cognitoId.value);
      userStore.setEmail(userAttributes.value.email);
      userStore.setReferredByCode(userAttributes.value['custom:referral_code']);
      userStore.setEmailVerified(userAttributes.value.email_verified === 'true');
      userStore.setJwt(newJwt);
      console.log('jwt', newJwt, userAttributes.value)
    }
  });

  return { authStatus, setJwt, jwt, isAuthenticated, amplifySignout };
});
