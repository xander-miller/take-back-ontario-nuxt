<script setup>
var { name, href, current } = defineProps({
	name: { type: String, required: true, },
	href: { type: String, required: true, },
	current: { type: Boolean, default: false, },
});
</script>

<template>
	<a :href="href"
		:class="[current ? 'bg-tboRed text-white' : 'text-gray-100 hover:bg-tboBlue-100 hover:text-gray-700', 'rounded-md px-3 py-2 text-sm font-medium']"
		:aria-current="current ? 'page' : undefined">{{ name }}</a>
</template>
<style scoped></style>