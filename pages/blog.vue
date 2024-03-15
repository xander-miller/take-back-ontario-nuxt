<template>
  <div>
    Posts
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <NuxtLink :to="'/blog/' + post.slug">{{ post.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useAsyncData } from '#imports';

const { data: posts } = useAsyncData('posts', async () => {
  // Assuming you are using @nuxt/content module
  const data = await useContent('blog').find();
  console.log({ data })
  return data.map(post => ({
    title: post.title,
    slug: post.slug
  }));
});
</script>
