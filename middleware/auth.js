import { useAuthStore } from '~/store/auth';
import { fetchAuthSession } from 'aws-amplify/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    console.log('To:', to.path);
    console.log('From:', from.path);
    const authStore = useAuthStore();
    let authSession;
    try {
      authSession = await fetchAuthSession();
    } catch (error) {
      console.warn('Unauthorized access attempt detected. Redirecting to /welcome');
    }
    if (authSession?.userSub) {
      const jwt = authSession.tokens.idToken.toString();
      if (!jwt) {
        console.warn('No JWT found in auth session. Redirecting to /welcome');
        return navigateTo('/welcome')
      }
      authStore.setJwt(jwt);
      console.log('User is authenticated. JWT:', jwt);
      return;
    }
    return navigateTo('/welcome');
  }
});
