<template>
	<div class="terms-privacy-container">
		<v-container
			class="terms-container"
			fluid
		>
			<v-card
				class="terms-card"
				elevation="8"
			>
				<v-card-title class="terms-title"> Правовая информация </v-card-title>

				<v-tabs
					v-model="activeTab"
					centered
					color="primary"
					class="terms-tabs"
					variant="outlined"
				>
					<v-tab
						value="privacy"
						class="terms-tab"
					>
						<v-icon class="mr-1">mdi-shield-account</v-icon>
						<span class="tab-text">Политика</span>
					</v-tab>
					<v-tab
						value="terms"
						class="terms-tab"
					>
						<v-icon class="mr-1">mdi-file-document</v-icon>
						<span class="tab-text">Соглашение</span>
					</v-tab>
				</v-tabs>

				<v-window
					v-model="activeTab"
					class="terms-window"
				>
					<!-- Политика конфиденциальности -->
					<v-window-item value="privacy">
						<v-card-text class="terms-content">
							<div class="text-h5 mb-4 text-primary">
								{{ privacyPolicyData.title }}
							</div>
							<div class="text-body-1 mb-4">
								<strong>Дата последнего обновления:</strong>
								{{ privacyPolicyData.lastUpdated }}
							</div>

							<v-divider class="my-4"></v-divider>

							<div
								v-for="section in privacyPolicyData.sections"
								:key="section.title"
								class="mb-6"
							>
								<h3 class="text-h6 mb-3 text-primary">{{ section.title }}</h3>
								<p class="mb-3">{{ section.content }}</p>

								<ul
									v-if="section.items"
									class="mb-3 pl-4"
								>
									<li
										v-for="item in section.items"
										:key="item"
										class="mb-2"
									>
										• {{ item }}
									</li>
								</ul>

								<p
									v-if="section.highlight"
									class="mb-3"
								>
									<strong>{{ section.highlight.split(':')[0] }}:</strong>
									{{ section.highlight.split(':').slice(1).join(':').trim() }}
								</p>
							</div>

							<v-alert
								v-if="privacyPolicyData.alert"
								:type="privacyPolicyData.alert.type"
								variant="tonal"
								class="mt-6"
							>
								<strong
									>{{ privacyPolicyData.alert.message.split(':')[0] }}:</strong
								>
								{{
									privacyPolicyData.alert.message
										.split(':')
										.slice(1)
										.join(':')
										.trim()
								}}
							</v-alert>
						</v-card-text>
					</v-window-item>

					<!-- Пользовательское соглашение -->
					<v-window-item value="terms">
						<v-card-text class="terms-content">
							<div class="text-h5 mb-4 text-primary">
								{{ termsOfServiceData.title }}
							</div>
							<div class="text-body-1 mb-4">
								<strong>Дата последнего обновления:</strong>
								{{ termsOfServiceData.lastUpdated }}
							</div>

							<v-divider class="my-4"></v-divider>

							<div
								v-for="section in termsOfServiceData.sections"
								:key="section.title"
								class="mb-6"
							>
								<h3 class="text-h6 mb-3 text-primary">{{ section.title }}</h3>
								<p class="mb-3">{{ section.content }}</p>

								<ul
									v-if="section.items"
									class="mb-3 pl-4"
								>
									<li
										v-for="item in section.items"
										:key="item"
										class="mb-2"
									>
										• {{ item }}
									</li>
								</ul>

								<p
									v-if="section.highlight"
									class="mb-3"
								>
									<strong>{{ section.highlight.split(':')[0] }}:</strong>
									{{ section.highlight.split(':').slice(1).join(':').trim() }}
								</p>
							</div>

							<v-alert
								v-if="termsOfServiceData.alert"
								:type="termsOfServiceData.alert.type"
								variant="tonal"
								class="mt-6"
							>
								<strong
									>{{ termsOfServiceData.alert.message.split(':')[0] }}:</strong
								>
								{{
									termsOfServiceData.alert.message
										.split(':')
										.slice(1)
										.join(':')
										.trim()
								}}
							</v-alert>
						</v-card-text>
					</v-window-item>
				</v-window>
			</v-card>
		</v-container>
	</div>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';

	// Типы для структуры данных
	interface DocumentSection {
		title: string;
		content: string;
		items?: string[];
		highlight?: string;
	}

	interface DocumentData {
		title: string;
		lastUpdated: string;
		sections: DocumentSection[];
		alert?: {
			type: 'info' | 'warning' | 'error' | 'success';
			message: string;
		};
	}

	// Константы для политики конфиденциальности
	const privacyPolicyData: DocumentData = {
		title: 'Политика конфиденциальности',
		lastUpdated: new Date().toLocaleDateString('ru-RU'),
		sections: [
			{
				title: '1. Общие положения',
				content:
					'Настоящая Политика конфиденциальности определяет порядок обработки персональных данных пользователей приложения ArcheAge Tracker (далее — «Приложение»). Используя Приложение, вы автоматически соглашаетесь с условиями данной Политики.',
				highlight:
					'Важно: Регистрация в системе означает ваше полное согласие на обработку персональных данных в соответствии с настоящей Политикой.'
			},
			{
				title: '2. Сбор данных',
				content:
					'Мы собираем следующие категории данных исключительно в статистических целях:',
				items: [
					'Имя пользователя и email адрес',
					'Данные об использовании Приложения (время сессий, активность)',
					'Техническая информация (IP-адрес, тип устройства, браузер)',
					'Игровые данные для трекинга прогресса',
					'Логи ошибок и производительности'
				],
				highlight:
					'Цель сбора: Все данные собираются исключительно для улучшения качества сервиса, анализа использования и предоставления статистики.'
			},
			{
				title: '3. Автоматическое согласие',
				content: 'При создании аккаунта в системе вы автоматически соглашаетесь:',
				items: [
					'На обработку всех указанных выше данных',
					'На использование данных для статистических целей',
					'На соблюдение всех правил и условий Приложения',
					'На получение уведомлений об обновлениях'
				]
			},
			{
				title: '4. Защита разработчика',
				content: 'Разработчик приложения не несет ответственности за:',
				items: [
					'Потерю данных в результате технических сбоев',
					'Несанкционированный доступ к аккаунтам пользователей',
					'Изменения в игровой механике ArcheAge',
					'Блокировку аккаунтов игроков администрацией игры',
					'Временную недоступность сервиса'
				]
			},
			{
				title: '5. Использование данных',
				content: 'Собранные данные используются только для:',
				items: [
					'Анализа эффективности Приложения',
					'Улучшения пользовательского опыта',
					'Предоставления статистических отчетов',
					'Технической поддержки и отладки'
				],
				highlight:
					'Гарантия: Данные не передаются третьим лицам и не используются в коммерческих целях без вашего явного согласия.'
			},
			{
				title: '6. Безопасность',
				content: 'Мы принимаем все необходимые меры для защиты ваших данных:',
				items: [
					'Шифрование данных при передаче',
					'Регулярное резервное копирование',
					'Ограниченный доступ к данным',
					'Мониторинг безопасности'
				]
			},
			{
				title: '7. Ваши права',
				content: 'Вы имеете право:',
				items: [
					'Запросить информацию о ваших данных',
					'Потребовать удаления аккаунта',
					'Отозвать согласие на обработку данных',
					'Получить копию ваших данных'
				]
			},
			{
				title: '8. Контакты',
				content:
					'По вопросам обработки персональных данных обращайтесь через систему обратной связи в Приложении.'
			}
		],
		alert: {
			type: 'info',
			message:
				'Напоминание: Продолжая использовать Приложение, вы подтверждаете свое согласие с данной Политикой конфиденциальности.'
		}
	};

	// Константы для пользовательского соглашения
	const termsOfServiceData: DocumentData = {
		title: 'Пользовательское соглашение',
		lastUpdated: new Date().toLocaleDateString('ru-RU'),
		sections: [
			{
				title: '1. Принятие условий',
				content:
					'Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между пользователем и разработчиком приложения ArcheAge Tracker.',
				highlight:
					'Важно: Регистрация в системе означает ваше полное согласие со всеми условиями данного Соглашения.'
			},
			{
				title: '2. Описание сервиса',
				content:
					'ArcheAge Tracker — это приложение для отслеживания прогресса в игре ArcheAge, предоставляющее статистические данные и аналитику игрового процесса.',
				highlight:
					'Сервис предоставляется «как есть» и предназначен исключительно для статистических и информационных целей.'
			},
			{
				title: '3. Регистрация и аккаунт',
				content: 'При регистрации вы обязуетесь:',
				items: [
					'Предоставлять достоверную информацию',
					'Соблюдать все правила и ограничения',
					'Не передавать аккаунт третьим лицам',
					'Своевременно обновлять данные'
				],
				highlight:
					'Автоматическое согласие: Создание аккаунта означает автоматическое согласие со всеми правилами системы.'
			},
			{
				title: '4. Ограничения ответственности',
				content: 'Разработчик не несет ответственности за:',
				items: [
					'Потерю игрового прогресса или данных',
					'Блокировку аккаунтов в игре ArcheAge',
					'Изменения в игровой механике',
					'Технические сбои и недоступность сервиса',
					'Действия других пользователей',
					'Ущерб от использования приложения'
				]
			},
			{
				title: '5. Запрещенные действия',
				content: 'Пользователям запрещается:',
				items: [
					'Использовать приложение для мошенничества',
					'Нарушать правила игры ArcheAge',
					'Распространять вредоносное ПО',
					'Попытки взлома или обхода ограничений',
					'Создание множественных аккаунтов',
					'Нарушение авторских прав'
				]
			},
			{
				title: '6. Интеллектуальная собственность',
				content:
					'Все права на приложение ArcheAge Tracker принадлежат разработчику. Пользователи не имеют права:',
				items: [
					'Копировать или модифицировать код',
					'Создавать производные продукты',
					'Использовать в коммерческих целях',
					'Обратно инжинирить приложение'
				]
			},
			{
				title: '7. Изменения в соглашении',
				content:
					'Разработчик оставляет за собой право изменять условия Соглашения. Продолжение использования приложения после изменений означает согласие с новыми условиями.',
				highlight:
					'Пользователи будут уведомлены об изменениях через приложение или по электронной почте.'
			},
			{
				title: '8. Прекращение действия',
				content: 'Соглашение может быть прекращено:',
				items: [
					'По инициативе пользователя (удаление аккаунта)',
					'По инициативе разработчика (нарушение правил)',
					'При прекращении работы сервиса'
				]
			},
			{
				title: '9. Применимое право',
				content:
					'Настоящее Соглашение регулируется законодательством Российской Федерации. Все споры разрешаются в судебном порядке.'
			},
			{
				title: '10. Контактная информация',
				content:
					'По всем вопросам, связанным с настоящим Соглашением, обращайтесь через систему обратной связи в Приложении.'
			}
		],
		alert: {
			type: 'warning',
			message:
				'Внимание: Используя приложение, вы подтверждаете, что прочитали, поняли и согласны соблюдать все условия данного Соглашения.'
		}
	};

	const activeTab = ref('privacy');
</script>

<style scoped>
	.terms-privacy-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #0b1d13 0%, #123524 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
		overflow: hidden;
	}

	.terms-container {
		max-width: 1200px;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.terms-card {
		border-radius: 20px;
		width: 100%;
		max-width: 1000px;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.terms-title {
		text-align: center;
		font-size: 2rem;
		font-weight: 600;
		padding: 24px 24px 16px 24px;
		background: linear-gradient(45deg, #1db954, #27ae60);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.terms-tabs {
		margin: 0 24px 16px 24px;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
	}

	.terms-tab {
		font-weight: 500;
		text-transform: none;
		min-width: 120px;
	}

	.tab-text {
		font-size: 0.9rem;
	}

	.terms-window {
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.terms-content {
		padding: 0 24px 24px 24px;
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		max-height: calc(90vh - 200px);
	}

	.terms-content::-webkit-scrollbar {
		width: 6px;
	}

	.terms-content::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
	}

	.terms-content::-webkit-scrollbar-thumb {
		background: #1db954;
		border-radius: 3px;
	}

	.terms-content::-webkit-scrollbar-thumb:hover {
		background: #27ae60;
	}

	/* Планшеты */
	@media (max-width: 1024px) {
		.terms-privacy-container {
			padding: 12px;
		}

		.terms-card {
			max-height: 95vh;
		}

		.terms-title {
			font-size: 1.75rem;
			padding: 20px 20px 12px 20px;
		}

		.terms-tabs {
			margin: 0 20px 12px 20px;
		}

		.terms-content {
			padding: 0 20px 20px 20px;
			max-height: calc(95vh - 180px);
		}
	}

	/* Мобильные устройства */
	@media (max-width: 768px) {
		.terms-privacy-container {
			padding: 8px;
			align-items: flex-start;
			padding-top: 20px;
		}

		.terms-container {
			height: auto;
			min-height: calc(100vh - 40px);
		}

		.terms-card {
			max-height: none;
			height: auto;
			min-height: calc(100vh - 40px);
		}

		.terms-title {
			font-size: 1.5rem;
			padding: 16px 16px 8px 16px;
		}

		.terms-tabs {
			margin: 0 16px 8px 16px;
		}

		.terms-tab {
			min-width: 100px;
			font-size: 0.85rem;
			padding: 8px 12px;
		}

		.tab-text {
			font-size: 0.8rem;
		}

		.terms-content {
			padding: 0 16px 16px 16px;
			flex: 1;
			max-height: calc(100vh - 160px);
		}

		.text-h5 {
			font-size: 1.25rem !important;
		}

		.text-h6 {
			font-size: 1.1rem !important;
		}

		.text-body-1 {
			font-size: 0.9rem !important;
		}
	}

	/* Маленькие мобильные устройства */
	@media (max-width: 480px) {
		.terms-privacy-container {
			padding: 4px;
			padding-top: 16px;
		}

		.terms-container {
			min-height: calc(100vh - 32px);
		}

		.terms-card {
			min-height: calc(100vh - 32px);
			border-radius: 16px;
		}

		.terms-title {
			font-size: 1.25rem;
			padding: 12px 12px 6px 12px;
		}

		.terms-tabs {
			margin: 0 12px 6px 12px;
		}

		.terms-tab {
			min-width: 80px;
			font-size: 0.8rem;
			padding: 6px 8px;
		}

		.tab-text {
			font-size: 0.75rem;
		}

		.terms-content {
			padding: 0 12px 12px 12px;
			max-height: calc(100vh - 140px);
		}

		.text-h5 {
			font-size: 1.1rem !important;
		}

		.text-h6 {
			font-size: 1rem !important;
		}

		.text-body-1 {
			font-size: 0.85rem !important;
		}

		.v-icon {
			font-size: 1.1rem !important;
		}

		ul {
			padding-left: 16px !important;
		}

		li {
			margin-bottom: 4px !important;
			font-size: 0.85rem;
		}
	}

	/* Очень маленькие экраны */
	@media (max-width: 360px) {
		.terms-title {
			font-size: 1.1rem;
		}

		.terms-tab {
			min-width: 70px;
			font-size: 0.75rem;
			padding: 4px 6px;
		}

		.tab-text {
			font-size: 0.7rem;
		}

		.text-h5 {
			font-size: 1rem !important;
		}

		.text-h6 {
			font-size: 0.95rem !important;
		}

		.text-body-1 {
			font-size: 0.8rem !important;
		}
	}
</style>
