<template>
	<component
		:is="layout"
		class="page-layout"
	>
		<RouterView />
	</component>
</template>

<script setup lang="ts">
	import { useRoute } from 'vue-router';
	import { PageLayout } from '@/app/layouts';
	import { computed } from 'vue';

	const route = useRoute();

	const layout = computed(() => {
		return route.meta.layout === 'none' ? 'div' : PageLayout;
	});
</script>
