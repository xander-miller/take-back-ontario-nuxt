<template>
  <SiteHeader />
  <TopBar />
  <QueensParkImage />
  <h1 v-if="page">
    {{ page.title }}
  </h1>
  <main class="main-content">
    <slot />
  </main>
</template>
<script setup>
const { page } = useContent()
</script>

<style scoped>
.main-content {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 1em;
  border-radius: 20px;
  margin-bottom: 2rem;
}
</style>