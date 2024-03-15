<template>
  <div>
    <h1>Netlify Identity</h1>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="openModal">Open Modal</button>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="goToBlogPage">Go to Blog</button>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

useHead({
  script: [
    { src: "https://identity.netlify.com/v1/netlify-identity-widget.js" },
  ],
});

const openModal = () => {
  if (window.netlifyIdentity) {
    window.netlifyIdentity.open();
  } else {
    console.log("netlifyIdentity not available");
  }
};

const goToBlogPage = () => {
  router.push('/blog');
};
</script>