<template>
  <div class="bg-white shadow">
    <a
      href="#"
      :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
      @click.prevent="authStore.signOutUser"
    >Sign Out</a>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';
import SiteHeaderLink from './SiteHeaderLink.vue';

const authStore = useAuthStore();
const navigation = [
  { name: 'Learn More', href: '/about', current: true },
  { name: 'Events', href: '/events', current: false },
  { name: 'Resources', href: '/resources', current: false },
]
</script>