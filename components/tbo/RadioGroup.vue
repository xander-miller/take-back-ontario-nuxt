<script setup>
	var props = defineProps({options: { type: Array, required: true,}});
	console.log('options: ', props.foo);
  const model = defineModel({ required: true, type: Object })
</script>

<template>
  <ul
    class="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white list-none"
  >
    <li
      v-for="(option, index) in options"
      :key="index"
      class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
    >
      <div class="flex items-center ps-3">
        <input
          id="list-radio-license"
          v-model="model"
          type="radio"
          value=""
          name="list-radio"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        >
        <label
          for="list-radio-license"
          class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >{{ option.label }}</label>
      </div>
    </li>
  </ul>
</template>
<style scoped></style>