<template>
	<v-dialog
		v-model="isOpen"
		max-width="500"
	>
		<v-card>
			<v-card-title class="text-h5">
				{{ isRegistering ? 'Регистрация' : 'Вход' }}
			</v-card-title>

			<v-card-text>
				<!-- Форма регистрации -->
				<v-form
					v-if="isRegistering"
					ref="registerFormRef"
					v-model="registerValid"
					class="flex flex-col gap-3"
					@keyup.enter="submit"
				>
					<v-text-field
						v-model="form.name"
						label="Login пользователя"
						:rules="[rules.required]"
						required
						variant="outlined"
						prepend-inner-icon="mdi-account"
					/>
					<v-text-field
						v-model="form.email"
						label="Email"
						:rules="[rules.required, rules.email]"
						required
						variant="outlined"
						prepend-inner-icon="mdi-email"
					/>
					<v-text-field
						v-model="form.password"
						label="Пароль"
						:type="showPassword ? 'text' : 'password'"
						:append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
						@click:append-inner="showPassword = !showPassword"
						:rules="[rules.required, rules.min]"
						required
						variant="outlined"
						prepend-inner-icon="mdi-lock"
					/>
					<v-text-field
						v-model="form.confirmPassword"
						label="Подтвердите пароль"
						:type="showPassword ? 'text' : 'password'"
						:rules="[rules.required, rules.matchPassword]"
						required
						variant="outlined"
						prepend-inner-icon="mdi-lock"
					/>
				</v-form>

				<!-- Форма авторизации -->
				<v-form
					v-else
					ref="loginFormRef"
					v-model="loginValid"
					class="flex flex-col gap-3"
					@keyup.enter="submit"
				>
					<v-text-field
						v-model="form.login"
						label="Email или login пользователя"
						:rules="[rules.required]"
						required
						variant="outlined"
						prepend-inner-icon="mdi-account"
					/>
					<v-text-field
						v-model="form.password"
						label="Пароль"
						:type="showPassword ? 'text' : 'password'"
						:append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
						@click:append-inner="showPassword = !showPassword"
						:rules="[rules.required, rules.min]"
						required
						variant="outlined"
						prepend-inner-icon="mdi-lock"
					/>
				</v-form>
			</v-card-text>

			<v-card-actions class="flex flex-col-reverse md:flex-row">
				<v-btn
					text
					@click="toggleMode"
					class="w-full md:w-min"
				>
					{{ isRegistering ? 'Уже есть аккаунт?' : 'Создать аккаунт' }}
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn
					color="primary"
					:disabled="isRegistering ? !registerValid : !loginValid"
					:loading="isLoading"
					@click="submit"
					class="w-full md:w-min"
				>
					{{ isRegistering ? 'Зарегистрироваться' : 'Войти' }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts" setup>
	import { useAppStore } from '@/app/app.store';
	import { createUser, getDeviceInfo, login } from '@/shared';
	import { ref, reactive } from 'vue';
	import { POSITION, useToast } from 'vue-toastification';

	const toast = useToast();
	const appStore = useAppStore();

	const isOpen = defineModel<boolean>('isOpen');
	const isRegistering = ref(false);
	const showPassword = ref(false);
	const isLoading = ref(false);

	const registerValid = ref(false);
	const loginValid = ref(false);

	const registerFormRef = ref();
	const loginFormRef = ref();

	const form = reactive({
		name: '',
		login: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const rules = {
		required: (v: string) => !!v || 'Поле обязательно',
		email: (v: string) => /.+@.+\..+/.test(v) || 'Неверный email',
		min: (v: string) => v.length >= 6 || 'Минимум 6 символов',
		matchPassword: (v: string) => v === form.password || 'Пароли не совпадают'
	};

	const clear = () => {
		form.name = '';
		form.login = '';
		form.email = '';
		form.password = '';
		form.confirmPassword = '';
		registerValid.value = false;
		loginValid.value = false;
	};

	function toggleMode() {
		isRegistering.value = !isRegistering.value;
		clear();
	}

	const submit = async () => {
		try {
			isLoading.value = true;

			if (isRegistering.value) {
				const success = await registerFormRef.value.validate();
				if (!success) return;

				if (form.password !== form.confirmPassword) return;

				await createUser({
					name: form.name,
					email: form.email,
					password: form.password,
					verificationUrl: `${import.meta.env.VITE_APP_FRONTEND_API_URL}/verify-email`
				});

				toast.success(
					'Успешная регистрация! Письмо отправлено на почту. Ссылка действует 15 минут.',
					{
						position: POSITION.BOTTOM_RIGHT,
						timeout: 10000
					}
				);
				clear();
				isOpen.value = false;
			} else {
				const success = await loginFormRef.value.validate();
				if (!success) return;

				// Получаем полную информацию об устройстве
				const deviceInfo = await getDeviceInfo();

				const result = await login({
					loginOrEmail: form.login,
					password: form.password,
					deviceInfo: {
						deviceName: deviceInfo.deviceName,
						deviceType: deviceInfo.deviceType,
						userAgent: deviceInfo.userAgent,
						ipAddress: deviceInfo.ipAddress,
						timezone: deviceInfo.timezone,
						location: deviceInfo.locationInfo?.city
							? `${deviceInfo.locationInfo.city}, ${deviceInfo.locationInfo.country}`
							: null,
						latitude: deviceInfo.locationInfo?.latitude,
						longitude: deviceInfo.locationInfo?.longitude,
						country: deviceInfo.locationInfo?.country,
						city: deviceInfo.locationInfo?.city,
						region: deviceInfo.locationInfo?.region
					}
				});

                appStore.auth = true
                appStore.userData = result.user

				clear();
				isOpen.value = false;
			}
		} catch (e) {
			toast.error('Произошла ошибка при выполнении запроса', {
				position: POSITION.BOTTOM_RIGHT,
				timeout: 5000
			});
		} finally {
			isLoading.value = false;
		}
	};
</script>
