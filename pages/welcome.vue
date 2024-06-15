
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
import {  fetchUserAttributes } from '@aws-amplify/auth';
import { useAuthenticator} from  "@aws-amplify/ui-vue";
const {route} = toRefs(useAuthenticator());
var referralCode = ref(); 
var emailPermission = ref();
watch(route, async ()=>{ 
	console.log('authstate', route.value);
	if(route.value === 'authenticated'){
	try {
    const userAttributes = await fetchUserAttributes();
		referralCode.value = userAttributes['custom:referral_code']
  } catch (error) {
    console.error(error);
  }
}
});

</script>

<style scoped></style>