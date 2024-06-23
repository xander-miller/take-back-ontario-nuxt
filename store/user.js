// store/user.ts
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { fetchUserAttributes } from '@aws-amplify/auth';

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: '',
    name: '',
    email: '',
    joined: '',
    referralCodes: [],
    phone: '',
    role: '',
    riding: '',
    lastAccess: '',
    canContact: false,
    referredByCode: '',
    emailVerified: false,
    jwt: '',
    hydrated: false
  });

  const amplifyUser = ref(null);

  const setUserProperty = (property, value) => {
    if (user.value.hasOwnProperty(property)) {
      user.value[property] = value;
    }
  };

  const setId = (sub) => setUserProperty('id', sub);
  const setName = (userName) => setUserProperty('name', userName);
  const setEmail = (userEmail) => setUserProperty('email', userEmail);
  const setJoined = (timestamp) => setUserProperty('joined', timestamp);
  const setReferralCodes = (codes) => setUserProperty('referralCodes', codes);
  const setPhone = (userPhone) => setUserProperty('phone', userPhone);
  const setRole = (userRole) => setUserProperty('role', userRole);
  const setRiding = (userRiding) => setUserProperty('riding', userRiding);
  const setLastAccess = (timestamp) => setUserProperty('lastAccess', timestamp);
  const setCanContact = (contact) => setUserProperty('canContact', contact);
  const setReferredByCode = (code) => setUserProperty('referredByCode', code);
  const setEmailVerified = (verified) => setUserProperty('emailVerified', verified);
  const setJwt = (jwt) => setUserProperty('jwt', jwt);
  const setHydrated = (hydrated) => setUserProperty('hydrated', hydrated);

  const checkUserExistsInNeo4j = async (jwt) => {
    const response = await fetch('/.netlify/functions/checkUserExists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jwt })
    });
    if (!response.ok) {
      if (response.status === 404) {
        return false;
      }
      throw new Error('Failed to check user existence in Neo4j', response.status);
    }
    return true;
  };

  const fetchUserDataFromNeo4j = async (jwt) => {
    const response = await fetch('/.netlify/functions/fetchUserData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jwt })
    });

    if (response.status === 404) {
      console.log('User not found in Neo4j');
      return null;
    }

    if (!response.ok) {
      console.error('Failed to fetch user data from Neo4j', response.status);
    }
    const userData = await response.json();
    return userData;
  };
  
  const sendUserDataToNeo4j = async (userData) => {
    try {
      const response = await fetch('/.netlify/functions/storeUserData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) throw new Error('Failed to send user data to Netlify function');
      const result = await response.json();
      console.log('User data sent successfully:', result);
    } catch (error) {
      console.error('Error sending user data to Netlify function:', error);
    }
  };

  const hydrateUser = async (jwt) => {
    // Check if user exists. If so, fetch user data from Neo4j. If not, send user data to Neo4j.
    let userAttributes = null;
    try {
      // This can throw an error if the user is not authenticated.
      userAttributes = await fetchUserAttributes();
      console.log('got user attributes', userAttributes);
      console.log('custom', userAttributes['custom:referral_code']);
    } catch (e) {
      console.error('Error fetching user attributes:', e);
      return;
    }
    console.log('got user attributes', userAttributes);
    // If the object looks, right, set it to the amplifyUser ref.
    if (userAttributes.sub) {
      amplifyUser.value = userAttributes;
    }
    // Check if the user exists.
    const exists = await checkUserExistsInNeo4j(jwt);
    if (exists) {
      const userData = await fetchUserDataFromNeo4j(jwt);
      if (userData) {
        // Set hydrated immediately, or the watch gets stuck in a loop.
        setHydrated(true);
        setId(userData.id);
        setName(userData.name);
        setEmail(userData.email);
        setJoined(userData.joined);
        setReferralCodes(userData.referralCodes);
        setPhone(userData.phone);
        setRole(userData.role);
        setRiding(userData.riding);
        setLastAccess(userData.lastAccess);
        setCanContact(userData.canContact);
        setReferredByCode(amplifyUser.value['custom:referral_code']);
        setEmailVerified(userData.emailVerified);
      }
    } else {
      const userData = {
        jwt,
        email: amplifyUser.value.email,
        referredByCode: amplifyUser.value['custom:referral_code']
      };
      sendUserDataToNeo4j(userData);
    }
  }

  // User id is set in /store/auth.js - so authentication takes place first, and then this kicks in.
  watch(user, async (newUser) => {
    console.log('New user:', newUser);
    if (newUser.jwt && !newUser.hydrated) {
      console.log('yolo, user:', await fetchUserAttributes());

      await hydrateUser(newUser.jwt);
    }
  }, { immediate: true, deep: true });

  const reset = () => {
    user.value = {
      id: '',
      name: '',
      email: '',
      joined: '',
      referralCodes: [],
      phone: '',
      role: '',
      riding: '',
      lastAccess: '',
      canContact: false,
      referredByCode: '',
      emailVerified: false,
      jwt: '',
      hydrated: false
    };
    amplifyUser.value = null;
  };

  return {
    user,
    amplifyUser,
    reset,
    setId,
    setName,
    setEmail,
    setJoined,
    setReferralCodes,
    setPhone,
    setRole,
    setRiding,
    setLastAccess,
    setCanContact,
    setReferredByCode,
    setEmailVerified,
    setJwt
  };
});
