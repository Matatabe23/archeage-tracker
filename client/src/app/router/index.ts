import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { Home, VerifyEmail } from '@/pages';

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: Home,
        meta: { layout: 'page' }
	},

    {
		path: '/verify-email',
		component: VerifyEmail,
        meta: { layout: 'none' }
	},

	{
		path: '/:catchAll(.*)',
		redirect: '/',
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
