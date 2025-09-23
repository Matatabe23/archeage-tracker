<template>
	<v-list>
		<template v-for="(item, index) in items" :key="item.title + index">
			<!-- Обычный элемент без вложений -->
			<v-list-item
				v-if="!item.children || item.children.length === 0"
				link
				@click="goTo(item.path)"
				:class="getItemClass()"
			>
				<v-list-item-content class="flex gap-2">
					<v-icon v-if="item.icon" :size="getIconSize()">{{ item.icon }}</v-icon>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<!-- Элемент с вложенными элементами -->
			<v-list-group
				v-else
				:value="item.title"
				:sub-group="level > 0"
			>
				<template v-slot:activator="{ props }">
					<v-list-item
						v-bind="props"
						:class="getItemClass()"
					>
						<v-icon v-if="item.icon" :size="getIconSize()">{{ item.icon }}</v-icon>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item>
				</template>

				<!-- Рекурсивно рендерим вложенные элементы -->
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
	interface NavigationItem {
		title: string;
		path?: string;
		icon?: string;
		visible?: boolean;
		children?: NavigationItem[];
	}

	interface Props {
		items: NavigationItem[];
		level?: number;
		goTo: (path: string | undefined) => void;
	}

	const props = withDefaults(defineProps<Props>(), {
		level: 0
	});

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
