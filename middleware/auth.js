import { useAuthStore } from '~/store/auth';
import { fetchAuthSession } from 'aws-amplify/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const authStore = useAuthStore();
    const authSession = await fetchAuthSession();

    if (authSession?.userSub) {
      const jwt = authSession.tokens.idToken.toString();
      if (!jwt) {
        return navigateTo('/welcome');
      }
      authStore.setJwt(jwt);
      console.log('User is authenticated. JWT:', jwt);
      return;
    }
    return navigateTo('/welcome');
  }
});
