<template>
	<TopBar />
	<QueensParkImage />
	<main class="main-content">
		<slot></slot>
	</main>
</template>
<script setup>

const { page } = useContent()
</script>

<style scoped>
.main-content {
	margin-top: 60px;
	background-color: rgba(255, 255, 255, 0.5);
	padding: 1em;
	border-radius: 20px;
	margin-bottom: 2rem;
}
</style>