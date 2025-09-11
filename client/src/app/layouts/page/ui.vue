<template>
	<v-app>
		<v-navigation-drawer
			v-if="!isHomePage"
			v-model="drawer"
			app
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
			v-if="!isHomePage"
			app
		>
			<v-app-bar-nav-icon @click="drawer = !drawer">
				<Icons
					icon="MENU"
					class="h-6 w-6"
				/>
			</v-app-bar-nav-icon>

			<span class="hidden md:block"> Пользователей онлайн: {{ onlineUsers }} </span>

			<div class="flex gap-2 ml-auto mr-4 cursor-pointer">
				<v-menu location="bottom">
					<template v-slot:activator="{ props }">
						<v-avatar
							v-bind="props"
							:image="
								appStore.userData.avatarUrl ||
								'https://api.dicebear.com/9.x/bottts/svg'
							"
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

		<v-main>
			<slot></slot>
		</v-main>

		<PublishPostsPanel v-model:isOpen="isPublishPanel" />
	</v-app>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { useRouter } from 'vue-router';
	import { useSocket } from '@/shared';
	import { useAppStore } from '@/app/app.store';

	const router = useRouter();
	const appStore = useAppStore();
	const socket = useSocket();

	const drawer = ref(false);
	const onlineUsers = ref(1);
	const isPublishPanel = ref(false);

	const goTo = (path: string) => {
		router.push(path);
	};

	const PAGES = [
		{
			title: 'Главная страница',
			path: '/publishing-page',
			icon: 'mdi-home',
			visible: true
		}
	];

	const isHomePage = computed(() => router.currentRoute.value.path === '/');
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

	onMounted(async () => {
		socket.on('onlineUsers', (count) => {
			onlineUsers.value = count;
		});

		socket.emit('requestOnlineUsersUpdate');
	});
</script>
