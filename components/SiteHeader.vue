<template>
  <div class="bg-white shadow">
    <!-- <a
      v-if="authStore.isAuthenticated"
      href="#"
      @click.prevent="authStore.signOutUser"
    >Sign Out</a> -->
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
</script>