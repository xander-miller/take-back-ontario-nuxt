<template>
  <div>
    <NuxtLayout>
      <h1>Blog</h1>
      <ul>
        <li
          v-for="post in posts"
          :key="post.slug"
        >
          <NuxtLink :to="`/blog/${post.slug}`">
            {{ post.title }}
          </NuxtLink>
        </li>
      </ul>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" async>
import { useAsyncData } from 'nuxt/app'
export default {
  async setup() {
    const { data: posts } = await useAsyncData('posts-list', () => queryContent('/blog').only(['title', 'slug']).find())
    return {
      posts,
    }
  }
}
</script>
