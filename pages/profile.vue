<template>
  <NuxtLayout>
    <TboAuthenticator>
      <template #default="{ user, signOut }">
        <h1>Hello {{ user.username }}!</h1>
        <p>You are signed in!</p>
        <button @click="signOut">
          Sign Out
        </button>
      </template>
    </TboAuthenticator>
  </NuxtLayout>
</template>
<script setup>


</script>

<style scoped></style>