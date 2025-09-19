<template>
	<div
		class="min-h-screen bg-gradient-to-br from-green-950 to-green-900 flex items-center justify-center p-4"
	>
		<div class="max-w-md w-full">
			<!-- Loading State -->
			<div
				v-if="isLoading"
				class="bg-white rounded-2xl shadow-xl p-8 text-center"
			>
				<div class="mb-6">
					<v-progress-circular
						:size="80"
						:width="6"
						color="primary"
						indeterminate
						class="mx-auto"
					></v-progress-circular>
				</div>
				<h2 class="text-2xl font-bold text-gray-800 mb-2">Подтверждение email</h2>
				<p class="text-gray-600">Проверяем ваш токен...</p>
			</div>

			<!-- Success State -->
			<div
				v-else-if="isSuccess"
				class="bg-white rounded-2xl shadow-xl p-8 text-center"
			>
				<div class="mb-6">
					<v-icon
						size="80"
						color="success"
						class="mx-auto"
					>
						mdi-check-circle
					</v-icon>
				</div>
				<h2 class="text-2xl font-bold text-green-600 mb-2">Email подтверждён!</h2>
				<p class="text-gray-600 mb-6">
					{{ successMessage }}
				</p>
				<v-btn
					color="primary"
					size="large"
					variant="flat"
					class="w-full"
					@click="goToHome"
				>
					Перейти на главную
				</v-btn>
			</div>

			<!-- Error State -->
			<div
				v-else-if="isError"
				class="bg-white rounded-2xl shadow-xl p-8 text-center"
			>
				<div class="mb-6">
					<v-icon
						size="80"
						color="error"
						class="mx-auto"
					>
						mdi-alert-circle
					</v-icon>
				</div>
				<h2 class="text-2xl font-bold text-red-600 mb-2">Ошибка подтверждения</h2>
				<p class="text-gray-600 mb-6">
					{{ errorMessage }}
				</p>
				<div class="space-y-3">
					<v-btn
						color="primary"
						size="large"
						variant="flat"
						class="w-full"
						@click="retryVerification"
					>
						Попробовать снова
					</v-btn>
					<v-btn
						color="grey"
						size="large"
						variant="outlined"
						class="w-full"
						@click="goToHome"
					>
						На главную
					</v-btn>
				</div>
			</div>

			<!-- No Token State -->
			<div
				v-else
				class="bg-white rounded-2xl shadow-xl p-8 text-center"
			>
				<div class="mb-6">
					<v-icon
						size="80"
						color="warning"
						class="mx-auto"
					>
						mdi-link-variant-off
					</v-icon>
				</div>
				<h2 class="text-2xl font-bold text-orange-600 mb-2">Неверная ссылка</h2>
				<p class="text-gray-600 mb-6">
					Ссылка для подтверждения email недействительна или отсутствует.
				</p>
				<v-btn
					color="primary"
					size="large"
					variant="flat"
					class="w-full"
					@click="goToHome"
				>
					На главную
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, onMounted } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import { verifyEmail } from '@/shared/api/users';

	// Reactive state
	const isLoading = ref(false);
	const isSuccess = ref(false);
	const isError = ref(false);
	const successMessage = ref('');
	const errorMessage = ref('');

	// Router
	const route = useRoute();
	const router = useRouter();

	// Get token from URL
	const getTokenFromUrl = (): string | null => {
		return (route.query.token as string) || null;
	};

	// Verify email function
	const verifyEmailToken = async (token: string) => {
		try {
			isLoading.value = true;
			isError.value = false;
			isSuccess.value = false;

			const message = await verifyEmail(token);
			successMessage.value = message;
			isSuccess.value = true;
		} catch (error: any) {
			errorMessage.value =
				error.response?.data?.message || 'Произошла ошибка при подтверждении email';
			isError.value = true;
		} finally {
			isLoading.value = false;
		}
	};

	// Retry verification
	const retryVerification = () => {
		const token = getTokenFromUrl();
		if (token) {
			verifyEmailToken(token);
		}
	};

	// Navigate to home
	const goToHome = () => {
		router.push('/');
	};

	onMounted(() => {
		const token = getTokenFromUrl();
		if (token) {
			verifyEmailToken(token);
		} else {
			isError.value = true;
			errorMessage.value = 'Токен подтверждения не найден в URL';
		}
	});
</script>
