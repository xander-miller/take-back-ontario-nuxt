
<template>
  <NuxtLayout>
    <TboAuthenticator>
      <h1>Hello, {{ email }}!</h1>
      
      <p>You signed up with referral code: {{ referralCode }}</p>
      <div class="space-y-10">
        <form @submit.prevent>
          <ProfileEmailPermission />
          <ProfileRidingSelector />
        </form>
      </div>
    </TboAuthenticator>
  </NuxtLayout>
</template>
<script setup>
import {  fetchUserAttributes } from '@aws-amplify/auth';
import { useAuthenticator} from  "@aws-amplify/ui-vue";
const {route} = toRefs(useAuthenticator());
var email = ref();
var referralCode = ref(); 
var emailPermission = ref();
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