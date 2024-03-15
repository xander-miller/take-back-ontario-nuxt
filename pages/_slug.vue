<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <nuxt-content :document="post" />
  </div>
</template>

<script setup>
import { useAsyncData } from '#imports';
import { useRoute } from 'vue-router';

const route = useRoute();
const { data: post } = useAsyncData('post', async () => {
  // Get the slug from the URL
  const slug = route.params.slug;
  // Fetch the markdown content for the post
  const content = await useContent('blog', slug).fetch();
  console.log({ content });
  return content;
});
</script>
