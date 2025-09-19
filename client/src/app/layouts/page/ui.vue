<template>
	<v-app>
		<v-navigation-drawer
			v-model="drawer"
			app
			color="surface"
		>
			<v-list>
				<v-list-item
					v-for="page in visiblePages"
					:key="page.title"
					link
					@click="goTo(page.path)"
				>
					<v-list-item-content class="flex gap-2">
						<v-icon>{{ page.icon }}</v-icon>

						<v-list-item-title>{{ page.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar
			app
			color="surface"
		>
			<v-app-bar-nav-icon @click="drawer = !drawer">
				<v-icon class="h-6 w-6">mdi-menu</v-icon>
			</v-app-bar-nav-icon>

			<div class="flex gap-2 ml-auto mr-4 cursor-pointer">
				<v-btn
					v-if="!appStore.auth"
					variant="tonal"
					@click="isAuthReg = true"
					>Войти</v-btn
				>

				<v-menu
					v-else
					location="bottom"
				>
					<template v-slot:activator="{ props }">
						<v-avatar
							v-bind="props"
							:image="'https://api.dicebear.com/9.x/bottts/svg'"
						></v-avatar>
					</template>

					<v-list class="mt-2">
						<v-list-item
							@click="item.function"
							v-for="(item, index) in MENU_LIST"
							:key="index"
						>
							<v-list-item-title>{{ item.title }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</div>
		</v-app-bar>

		<v-main class="main">
			<slot></slot>
		</v-main>

		<AuthRegPanel v-model:isOpen="isAuthReg" />
	</v-app>
</template>

<script setup lang="ts">
	import { ref, computed, reactive } from 'vue';
	import { useRouter } from 'vue-router';
	import { useAppStore } from '@/app/app.store';
	import { AuthRegPanel } from '@/widgets';

	const router = useRouter();
	const appStore = useAppStore();

	const drawer = ref(false);
	const isAuthReg = ref(false);

	const goTo = (path: string) => {
		router.push(path);
	};

	const PAGES = reactive([
		{
			title: 'Главная страница',
			path: '/',
			icon: 'mdi-home',
			visible: true
		}
	]);

	const visiblePages = computed(() => PAGES.filter((page) => page.visible));

	const exit = async () => {
		localStorage.removeItem('user');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		appStore.auth = false;
		await router.push('/');
	};

	const MENU_LIST = [
		{
			title: 'Профиль',
			function: () => router.push('/profile')
		},
		{
			title: 'Выйти',
			function: exit
		}
	];
</script>
