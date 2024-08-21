<script setup>
	import { Authenticator } from "@aws-amplify/ui-vue";
	import "@aws-amplify/ui-vue/styles.css";
	import { useRoute } from 'vue-router';

	const route = useRoute()

  var signIn =  route.query.signIn !== undefined ;
	var initialAuthState = signIn ? 'signIn': 'signUp';
console.log(signIn, initialAuthState);
	var formFields = {
		signUp:{
			'custom:referral_code': {
				label: 'Referral Code',
				placeholder: 'Enter a referral code',
				isRequired: true,
			},
		}
	};
</script>

<template>
  <authenticator
    :initial-state="initialAuthState"
    :form-fields="formFields"
  >
    <slot />
  </authenticator>
</template>
<style scoped></style>