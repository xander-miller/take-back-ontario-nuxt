<template>
  <div class="page-container">
    <NuxtLayout name="bare">
      <div class="signup-header">
        <img
          src="/img/tbo-trillium.png"
          class="tbo-trillium"
        >
        <h2>Welcome to Take Back Ontario!</h2>
        <p class="prose-slate text-center">
          Let&rsaquo;s get you set up.
          Use the tools below to select or find your electoral district.
        </p>
      </div>
      <RidingSelector />
      <TboButton>Finish Sign Up</TboButton>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { fetchUserAttributes } from '@aws-amplify/auth';
import { useAuthenticator } from "@aws-amplify/ui-vue";
import { useUserStore } from '~/store/user';
import { ref, watch, toRefs } from 'vue';
import { useAuthStore } from '~/store/auth';
import RidingSelector from '~/components/RidingSelector.vue';

const { route } = toRefs(useAuthenticator());
const userStore = useUserStore();
const referralCode = ref('');
const emailPermission = ref('');
const authStore = useAuthStore();

watch(route, async () => {
  console.log('Route changed:', route.value);
  if (route.value === 'authenticated') {
    try {
      const userAttributes = await fetchUserAttributes();
      console.log('user attributes in welcome:', userAttributes);
      // referralCode.value = userAttributes['custom:referral_code'];

      // // Check if the user exists in Neo4j
      // const userExists = await checkUserExistsInNeo4j(userAttributes['sub']);
      // if (userExists) {
      //   // Fetch user data from Neo4j and populate the store
      //   const userData = await fetchUserDataFromNeo4j(userAttributes['sub']);
      //   populateUserStore(userData);
      // } else {
      //   // Set user information in Pinia store for new users
      //   userStore.setId(userAttributes['sub']);
      //   userStore.setName(userAttributes['name']);
      //   userStore.setEmail(userAttributes['email']);
      //   userStore.setJoined(new Date().toISOString());
      //   userStore.setPhone(userAttributes['phone_number']);
      //   userStore.setRole(userAttributes['custom:role']);
      //   userStore.setRiding(userAttributes['custom:riding']);
      //   userStore.setLastAccess(new Date().toISOString());
      //   userStore.setCanContact(userAttributes['custom:can_contact'] === 'true');

        // Send user data to Netlify function
        // await sendUserDataToNetlify({
        //   Username: userAttributes['email'],
        //   UserAttributes: [
        //     { Name: 'email', Value: userAttributes['email'] },
        //     { Name: 'custom:referral_code', Value: userAttributes['custom:referral_code'] }
        //   ],
        //   ClientId: userAttributes['sub']
        // });
      // }
    } catch (error) {
      console.error(error);
    }
  }
});

const finishSignUp = () => {
  // Additional sign-up logic can be placed here
  // e.g., updating other user store fields based on form input
};

</script>

<style>
body {
  background-color: white;
}

.signup-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
}
.tbo-trillium {
  width: 100px;
  height: 96.7px;

}
</style>
