<template>
  <NuxtLayout>
    <TboAuthenticator>
      <h1>Welcome to Take Back Ontario!</h1>
      <p>You signed up with referral code: {{ referralCode }}</p>
      <h2>Onboarding questions:</h2>
      <div class="p-5">
        <form
          class="space-y-5"
          @submit.prevent
        >
          <ProfileEmailPermission />

          <ProfileRidingSelector />
          <TboButton>Finish Sign Up</TboButton>
        </form>
      </div>
    </TboAuthenticator>
  </NuxtLayout>
</template>

<script setup>
import { fetchUserAttributes } from '@aws-amplify/auth';
import { useAuthenticator } from "@aws-amplify/ui-vue";
const { route } = toRefs(useAuthenticator());
var referralCode = ref(); 
var emailPermission = ref();

watch(route, async () => {
  console.log('authstate', route.value);
  if (route.value === 'authenticated') {
    try {
      const userAttributes = await fetchUserAttributes();
      referralCode.value = userAttributes['custom:referral_code'];

      // Prepare user data to send to Netlify function
      const userData = {
        Username: userAttributes['email'],
        UserAttributes: [
          {
            Name: 'email',
            Value: userAttributes['email']
          },
          {
            Name: 'custom:referral_code',
            Value: userAttributes['custom:referral_code']
          }
        ],
        ClientId: userAttributes['sub'] // Using sub as the client ID
      };

      // Send user data to Netlify function
      await sendUserDataToNetlify(userData);
    } catch (error) {
      console.error(error);
    }
  }
});

// Function to send user data to Netlify function
const sendUserDataToNetlify = async (userData) => {
  try {
    const response = await fetch('/.netlify/functions/handleSignup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error('Failed to send user data to Netlify function');
    }

    const result = await response.json();
    console.log('User data sent successfully:', result);
  } catch (error) {
    console.error('Error sending user data to Netlify function:', error);
  }
};
</script>

<style scoped></style>
