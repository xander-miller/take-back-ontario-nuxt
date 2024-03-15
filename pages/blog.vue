<template>
  <div>
    <h1>Blog</h1>
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from 'nuxt/app'

const { data: posts } = await useAsyncData('posts-list', () => queryContent('/blog').only(['title', 'slug']).find())
</script>
