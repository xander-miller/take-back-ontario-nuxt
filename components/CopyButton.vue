<template>
    <button class="p-4 col-span-2 text-white bg-tbored-700 hover:bg-tbored-800 focus:ring-4 focus:outline-none focus:ring-tbored-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center dark:bg-tbored-600 dark:hover:bg-tbored-700 dark:focus:ring-tbored-800 items-center inline-flex justify-center" @click="copy">
        <span id="default-message">{{props.info}}</span>
          <span id="success-message" class="hidden inline-flex items-center">
              <svg class="w-3 h-3 text-white me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
              </svg>
              Copied!
          </span>
      </button>
</template>
<script setup>
  const props = defineProps({info: String, value: String})
  const copy = () => {
    navigator.clipboard.writeText(props.value)
  }

</script>
