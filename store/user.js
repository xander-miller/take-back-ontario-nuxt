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
    jwt: ''
  });

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

  const checkUserExistsInNeo4j = async (jwt) => {
    try {
      const response = await fetch('/.netlify/functions/checkUserExists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jwt })
      });
  
      if (!response.ok) throw new Error('Failed to check user existence in Neo4j');
      const result = await response.json();
      return result.exists;
    } catch (error) {
      console.error('Error checking user existence in Neo4j:', error);
      return false;
    }
  };

  const fetchUserDataFromNeo4j = async (id) => {
    try {
      const response = await fetch('/.netlify/functions/fetchUserData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
  
      if (!response.ok) throw new Error('Failed to fetch user data from Neo4j');
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error fetching user data from Neo4j:', error);
      return null;
    }
  };
  
  const sendUserDataToNetlify = async (userData) => {
    try {
      const response = await fetch('/.netlify/functions/handleSignup', {
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

  // User id is set in /store/auth.js - so authentication takes place first, and then this kicks in.
  watch(user, async (newUser) => {
    if (newUser.id && newUser.jwt) {
      const userExists = await checkUserExistsInNeo4j(newUser.jwt);
      console.log('got new cognito id', newUser.id, userExists);
    }
  }, { immediate: true, deep: true });

  return {
    user,
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
