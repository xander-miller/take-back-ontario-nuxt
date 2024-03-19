<template>
  <div>
    <NuxtLayout>
      <h1>Netlify Identity</h1>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="openModal">Open
        Modal</button>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="goToBlogPage">Go to
        Blog</button>
      <ContentDoc />
    </NuxtLayout>
    <div class="buttons">
      <button @click="goToPage('about')" class="btn my-8">Learn&nbsp;More</button>
      <button @click="goToPage('events')" class="btn my-8" href="/events">Events</button>
      <button @click="goToPage('resources')" class="btn my-8" href="/resources">Resources</button>
      <a class="btn my-8" href="https://signup.takebackontario.ca">Join&nbsp;Us</a>
    </div>
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
const goToPage = (page) => {
  router.push(page);
}
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.large-image {
  width: 100%;
  margin: 0 auto;
  display: block;
}

.text-black {
  text-align: center;
  font-size: 3.5rem;
}
</style>