// store/user.ts
import { defineStore } from 'pinia';
import { ref, nextTick } from 'vue';
import { fetchUserAttributes, updateUserAttributes } from '@aws-amplify/auth';
import _ from 'lodash';

export const useUserStore = defineStore('user', () => {

  const getUserTemplate = () => {
    return {
      id: '',
      name: '',
      email: '',
      joined: '',
      referralCodes: [],
      phone: '',
      role: '',
      riding: null,
      lastAccess: '',
      canContact: false,
      referredByCode: '',
      emailVerified: false,
    };
  };

  const user = ref(getUserTemplate());
  const jwt = ref(null);

  const reset = () => {
    user.value = getUserTemplate();
    jwt.value = null;
  };

  const mapCognitoUserToUser = (cognitoProperties) => {
    return {
      id: cognitoProperties.sub,
      name: cognitoProperties.name,
      email: cognitoProperties.email,
      phone: cognitoProperties.phone_number,
      riding: cognitoProperties['custom:riding'],
      canContact: cognitoProperties['custom:riding_contact'] === 'on',
      referredByCode: cognitoProperties['custom:referral_code'],
      emailVerified: cognitoProperties.email_verified,
    };
  }

  // An object merge that doesn't overwrite existing properties with nulls, undefined or empty
  const mergeKeepingValues = (target, source) => {
    for (let key in source) {
      if (source[key] !== null && source[key] !== undefined && source[key] !== '') {
        target[key] = source[key];
      }
    }
    return target;
  }

  // Initializes the user: hydrate (fetch data from neo4j), create (new user if not exist), update (if cognito attributes have changed). Called from auth store. Takes a JWT.
  const initializeUser = async (token) => {
    console.log('initializeUser', token);
    if (!token) throw new Error('No JWT provided to initializeUser');
    if (jwt.value === token) return;
    jwt.value = token;
    try {
      const cognitoAttributes = await fetchUserAttributes();
      const exists = await checkUserExistsInNeo4j(jwt.value);
      if (exists) {
        console.log('User exists in Neo4j');
        const userTemplate = getUserTemplate();
        userTemplate.lastAccess = new Date().toISOString();
        const neo4jUser = mergeKeepingValues(userTemplate, await fetchUserDataFromNeo4j(jwt.value));
        const userWithCognitoAttributes = mergeKeepingValues(neo4jUser, mapCognitoUserToUser(cognitoAttributes));
        console.log('userWithCognitoAttributes', userWithCognitoAttributes);
        if (!_.isEqual(user.value, userWithCognitoAttributes)) {
          user.value = userWithCognitoAttributes;
          console.log('User object has changed. Updating Neo4j.');
          await updateUserDataInNeo4j({ ...user.value, jwt: jwt.value });
        } else {
          console.log('User object is the same as Neo4j. No need to update.');
        }
      } else {
        console.log('User does not exist in Neo4j. Creating.');
        const userTemplate = getUserTemplate();
        const updatedUser = mergeKeepingValues(userTemplate, mapCognitoUserToUser(cognitoAttributes));
        updatedUser.joined = new Date().toISOString();
        updatedUser.lastAccess = new Date().toISOString();
        updatedUser.jwt = jwt.value;
        console.log('updatedUser', updatedUser);
        user.value = updatedUser;
        await createUserDataInNeo4j();
      }
    } catch (error) {
      console.error('Error initializing JWT:', error);
    }
  };

  const setUserProperty = async (property, value) => {
    console.log('setUserProperty', property, value);
    // Only sets if the property exists in the user object and the value is truthy.
    if (value) {
      console.log('setting', property, 'to', value, user.value[property]);
      user.value[property] = value;
    }
    await nextTick();
    await updateUserDataInNeo4j(user.value);
    console.log('Current user.value', user.value);
  };

  const setId = (sub) => setUserProperty('id', sub);
  const setName = async (userName) => {
    await updateUserAttributes({ userAttributes: { name: userName } });
    await setUserProperty('name', userName);
  };
  const setEmail = async (userEmail) => {
    await updateUserAttributes({ userAttributes: { email: userEmail } });
    await setUserProperty('email', userEmail);
  };
  const setPhone = async (userPhone) => {
    await updateUserAttributes({ userAttributes: { phone_number: userPhone } });
    await setUserProperty('phone', userPhone);
  };
  const setRiding = async (userRiding) => {
    console.log('Attempting to set riding to:', userRiding);
    await updateUserAttributes({ userAttributes: { 'custom:riding': userRiding } });
    await setUserProperty('riding', userRiding);
  };
  const setCanContact = async (contact) => {
    await updateUserAttributes({ userAttributes: { 'custom:riding_contact': contact } });
    await setUserProperty('canContact', contact);
  };
  const setReferredByCode = async (code) => {
    await updateUserAttributes({ userAttributes: { 'custom:referral_code': code } });
    await setUserProperty('referredByCode', code);
  };
  const setReferralCodes = (codes) => setUserProperty('referralCodes', codes);
  const setRole = (userRole) => setUserProperty('role', userRole);

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
    const userData = user.value;
    userData.jwt = jwt.value;
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

  const fetchUserDataFromNeo4j = async () => {
    const response = await fetch('/.netlify/functions/fetchUserData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jwt: jwt.value })
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

  const fetchNetworkFromNeo4j = async () => {
    const response = await fetch('/.netlify/functions/fetchNetworkGraph', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jwt: jwt.value })
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
  const updateUserDataInNeo4j = async () => {
    const userData = user.value;
    userData.jwt = jwt.value;
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

  return {
    user,
    reset,
    setId,
    setName,
    setEmail,
    setReferralCodes,
    setPhone,
    setRole,
    setRiding,
    setCanContact,
    setReferredByCode,
    initializeUser,
    fetchNetworkFromNeo4j
  };
});
