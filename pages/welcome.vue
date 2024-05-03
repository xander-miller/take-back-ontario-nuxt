
<template>
  <NuxtLayout>
    <TboAuthenticator>
      <h1>Hello, {{ email }}!</h1>
      <p>This is the onboarding page!</p>
      <p>You signed up with referral code: {{ referralCode }}</p>
    </TboAuthenticator>
  </NuxtLayout>
</template>
<script setup>
import {  fetchUserAttributes } from '@aws-amplify/auth';
import { useAuthenticator} from  "@aws-amplify/ui-vue";
const {route} = toRefs(useAuthenticator());
var email = ref();
var referralCode = ref(); 

watch(route, async ()=>{ 
	console.log('authstate', route.value);
	if(route.value === 'authenticated'){
	try {
    const userAttributes = await fetchUserAttributes();
		email.value = userAttributes.email;
		referralCode.value = userAttributes['custom:referral_code']
  } catch (error) {
    console.error(error);
  }
}
});

</script>

<style scoped></style>