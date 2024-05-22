<script setup>
defineEmits('update:modelValue');
var props = defineProps({tabs: {
	type: Array,required:true,
	}, 
	
});	
const selected = defineModel({type: Number, required: true});
console.log('selected model', selected);
	function isSelected (index) {
		return selected.value === index;
	};
</script>

<template>
  <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 list-none">
    <li
      v-for="(tab, index) in tabs"
      :key="tab"
      class="me-2"
    >
      <a
        href="#"
        aria-current="page"
        class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        :class="{
          'bg-gray-100': isSelected(index),
          'rounded-t-lg': isSelected(index),
          'active': isSelected(index),
          'dark:bg-gray-800': isSelected(index),
          'dark:text-blue-500': isSelected(index),
        }"
        @click.prevent="$emit('update:modelValue', index)"
      >{{ tab }}</a>
    </li>
  </ul>
</template>
<style scoped>
</style>