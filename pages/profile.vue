<template>
	<authenticator initial-state="signUp">
		<template v-slot="{ user, signOut }">
			<h1>Hello {{ user.username }}!</h1>
			<button @click="signOut">Sign Out</button>
		</template>
	</authenticator>
</template>
<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
</script>

<style scoped></style>