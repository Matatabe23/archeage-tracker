<template>
	<v-list>
		<template
			v-for="(item, index) in items"
			:key="item.title + index"
		>
			<!-- Обычный элемент -->
			<v-list-item
				v-if="item.visible && (!item.children || item.children.length === 0)"
				link
				@click="goTo(item.path)"
				:class="getItemClass()"
			>
				<v-list-item-content class="flex gap-2">
					<v-icon
						v-if="item.icon"
						:size="getIconSize()"
						>{{ item.icon }}</v-icon
					>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<!-- Элемент с вложенными -->
			<v-list-group
				v-else-if="item.visible"
				:value="item.open"
				@update:value="item.open = $event"
				:sub-group="level > 0"
			>
				<template v-slot:activator="{ props }">
					<v-list-item
						v-bind="props"
						:class="getItemClass()"
					>
						<v-icon
							v-if="item.icon"
							:size="getIconSize()"
							>{{ item.icon }}</v-icon
						>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item>
				</template>

				<NavigationMenu
					:items="item.children"
					:level="level + 1"
					:go-to="goTo"
				/>
			</v-list-group>
		</template>
	</v-list>
</template>

<script setup lang="ts">
	import { NavigationItem } from '@/shared';
	import { watch } from 'vue';
	import { NavigationMenu } from '.';

	interface Props {
		level?: number;
		goTo: (path: string | undefined) => void;
	}

	const props = withDefaults(defineProps<Props>(), {
		level: 0
	});

	const items = defineModel<NavigationItem[]>('items');

	watch(
		() => items.value,
		(value) => {
			console.log(value);
		},
		{ deep: true, immediate: true }
	);

	const getItemClass = () => {
		const baseClass = 'flex gap-2';
		if (props.level === 0) return baseClass;
		if (props.level === 1) return `${baseClass} ml-4`;
		return `${baseClass} ml-${props.level * 4}`;
	};

	const getIconSize = () => {
		return props.level > 0 ? 'small' : 'default';
	};
</script>
