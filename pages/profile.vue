<template>
  <NuxtLayout>
    <div>
      <p>You are signed in!</p>
    </div>
    <h1>Hello {{ userStore.user.email }}!</h1>>

    <button @click="authStore.signOutUser">
      Sign Out
    </button>
  </NuxtLayout>
</template>
<script setup>
import { useUserStore } from '~/store/user';
import { useAuthStore } from '~/store/auth';
definePageMeta({
  middleware: 'auth'
});

const userStore = useUserStore();
const authStore = useAuthStore();

</script>

<style scoped></style>