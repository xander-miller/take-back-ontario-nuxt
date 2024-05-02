
<template>
  <NuxtLayout>
    <TboAuthenticator>
        <h1>Hello, {{email}}!</h1>
        <p>This is the onboarding page!</p>
				<p>You signed up with rerral code: {{ referralCode }}</p>
    </TboAuthenticator>
  </NuxtLayout>
</template>
<script setup>
import {  fetchUserAttributes } from '@aws-amplify/auth';
import { useAuthenticator} from  "@aws-amplify/ui-vue";
const {route} = toRefs(useAuthenticator());
var email = ref();
var referralCode = ref(); 
console.log('route', route.value);
watch(route, async ()=>{ 
	console.log('authstate', route.value);
	if(route.value === 'authenticated'){
		console.log('fetching attribs');
	try {
    const userAttributes = await fetchUserAttributes();
    console.log(userAttributes);
		email = userAttributes.email;
		referralCode= userAttributes.referral_code;
  } catch (error) {
    console.log(error);
  }
}
});

</script>

<style scoped></style>