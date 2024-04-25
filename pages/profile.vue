<template>
	<NuxtLayout>
		<authenticator :initial-state="intialAuthState">
			<template v-slot="{ user, signOut }">
				<h1>Hello {{ user.username }}!</h1>
				<p>You are signed in!</p>
				<button @click="signOut">Sign Out</button>
			</template>
		</authenticator>
	</NuxtLayout>
</template>
<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import { useRoute } from 'vue-router';
const route = useRoute()

var intialAuthState = route.query.type == 'signIn' ? 'signIn' : 'signUp';
</script>

<style scoped></style>