<template>
  <div>
    <NuxtLayout>
      <h1>Netlify Identity</h1>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="openModal"
      >
        Open
        Modal
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="goToBlogPage"
      >
        Go to
        Blog
      </button>
      <ContentDoc />
      <div class="buttons">
        <button
          class="btn my-8"
          @click="goToPage('about')"
        >
          Learn&nbsp;More
        </button>
        <button
          class="btn my-8"
          href="/events"
          @click="goToPage('events')"
        >
          Events
        </button>
        <button
          class="btn my-8"
          href="/resources"
          @click="goToPage('resources')"
        >
          Resources
        </button>
        <a
          class="btn my-8"
          href="https://signup.takebackontario.ca"
        >Join&nbsp;Us</a>
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup>

// import tboLogo from '~/assets/tbo-logo.png';

useHead({
  title: "Home",
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

</script>

<style scoped>
.buttons {
  display: flex;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  max-width: 800px;
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