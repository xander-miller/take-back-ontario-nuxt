// store/user.ts
import { defineStore } from 'pinia';
import { ref, watch, nextTick } from 'vue';
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
  });


  const amplifyUser = ref(null);

  const setUserProperty = async (property, value) => {
    console.log('setUserProperty', property, value);
    // Only sets if the property exists in the user object and the value is truthy.
    if (value) {
      console.log('setting', property, 'to', value, user.value[property]);
      user.value[property] = value;
    }
    await nextTick();
    console.log('Current user.value', user.value);
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

  // User id is set in /store/auth.js - so authentication takes place first, and then this kicks in.
  // We watch for the jwt to change, and then we hydrate the user object.
  watch(() => user.value.jwt, async (newJwt, oldJwt) => {
    console.log('New JWT:', newJwt, 'Old JWT', oldJwt);
    if (newJwt && newJwt !== oldJwt) {
      console.log('got new JWT', newJwt);
      try {
        await hydrateUser(newJwt);
      } catch (error) {
        console.error('Error hydrating user:', error);
      }
    }
  });

  // Consolidates userAttributes from AWS Cognito and Neo4j record, and fetches the new Neo4j record
  const hydrateUser = async (jwt) => {
    let userAttributes = null;
      // Gets cognito data. This can throw an error if the user is not authenticated.
    userAttributes = await fetchUserAttributes();
    console.log('got user attributes', userAttributes);
    // If the object looks, right, set it to the amplifyUser ref.
    if (userAttributes.sub) {
      setName(userAttributes.name);
      setId(userAttributes.sub);
      setReferredByCode(userAttributes['custom:referral_code']);
      setEmail(userAttributes.email);
      setEmailVerified(userAttributes.email_verified);
      setPhone(userAttributes.phone_number);
    } else {
      throw new Error('No valid user attributes found from Cognito after JWT change.');
    }
    // Check if the user exists.
    const exists = await checkUserExistsInNeo4j(jwt);
    if (exists) {
      console.log('User exists in Neo4j. Here is the updated user object:', user.value);
      await updateUserDataInNeo4j(user.value); // in case of changes in Cognito
      const userData = await fetchUserDataFromNeo4j(jwt);
      console.log('got user data', userData);
      if (userData) {
        console.log('User does not exist already, creating', userData);
        Object.assign(user.value, userData);
      }
    } else {
      createUserDataInNeo4j();
    }
  };

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

  const createUserDataInNeo4j = async () => {
    // This expects an amplify.user object.
    try {
      const response = await fetch('/.netlify/functions/createUserData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user.value)
      });
      if (!response.ok) throw new Error('Failed to send user data to Netlify function');
      const result = await response.json();
      console.log('User data sent successfully:', result);
    } catch (error) {
      console.error('Error sending user data to Netlify function:', error);
    }
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

  const fetchNetworkFromNeo4j = async (jwt) => {
    const response = await fetch('/.netlify/functions/fetchNetworkGraph', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jwt })
    });

    if (response.status === 404) {
      console.log('Network not found in Neo4j');
      return null;
    }

    if (!response.ok) {
      console.error('Failed to fetch network from Neo4j', response.status);
    }
    const networkData = await response.json();
    return networkData;
  };
  

  // Update the user data in Neo4j. Takes a user object.
  const updateUserDataInNeo4j = async (userData) => {
    try {
      const response = await fetch('/.netlify/functions/updateUserData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (!response.ok) throw new Error('Failed to update user data in Neo4j');
      const result = await response.json();
      console.log('User data updated successfully:', result);
    } catch (error) {
      console.error('Error updating user data in Neo4j:', error);
    }
  };

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
    setJwt,
    fetchNetworkFromNeo4j
  };
});
