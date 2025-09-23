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
				:prepend-icon="item.icon"
			>
				<v-list-item-content class="flex gap-2">
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<!-- Элемент с вложенными -->
			<v-list-group
				v-else-if="item.visible"
				:value="item.open"
				@update:value="item.open = $event"
				:sub-group="level > 0"
                :class="`ml-${level * 2}`"
			>
				<template v-slot:activator="{ props }">
					<v-list-item
						v-bind="props"
						:prepend-icon="item.icon"
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
	import { NavigationMenu } from '.';

	interface Props {
		level?: number;
		goTo: (path: string | undefined) => void;
	}

	withDefaults(defineProps<Props>(), {
		level: 0
	});

	const items = defineModel<NavigationItem[]>('items');
</script>
