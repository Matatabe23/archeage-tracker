import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { Home } from '@/pages';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: Home,
        meta: { layout: 'page' }
	},

	{
		path: '/:catchAll(.*)',
		redirect: '/not-found',
        meta: { layout: 'page' }
	}
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior() {
		return { top: 0 };
	}
});
