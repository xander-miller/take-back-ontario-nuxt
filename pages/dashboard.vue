<template>
  <NuxtLayout>
    <div v-if="authStore.isAuthenticated">
      Hello World
    </div>
    <div v-else>
      Loading...
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();

definePageMeta({
  middleware: 'auth'
});
</script>

<style scoped></style>
