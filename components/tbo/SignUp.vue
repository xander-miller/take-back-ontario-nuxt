<template> 
  <nuxt-link 
    :to="link"
    class="text-center text-base hover:no-underline"
  >
    <button
      class="join-button hover:bg-red-800 bg-red-700 mt-36 text-white font-bold py-2 px-4 rounded-full shadow"
    >
      Join Take Back Ontario
    </button>
  </nuxt-link>
</template>

<script setup>
  const runtimeConfig = useRuntimeConfig()
  const newSignUp = runtimeConfig.public.NEW_SIGN_UP

  const link = newSignUp == "true" ? "/join": "https://docs.google.com/forms/d/e/1FAIpQLSc81gpDidaxKx8Mciv4Dr3oo0DjrdpNlCfcvGjDZp3mAlpW0g/viewform"

</script>

<style scoped>
.join-button {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
  z-index: 1000;
}
</style>
