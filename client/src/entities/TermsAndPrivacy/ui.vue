<template>
	<div class="terms-privacy-container">
		<v-container class="terms-container" fluid>
			<v-card class="terms-card" elevation="8">
				<v-card-title class="terms-title">
					Правовая информация
				</v-card-title>
				
				<v-tabs
					v-model="activeTab"
					centered
					color="primary"
					class="terms-tabs"
					variant="outlined"
				>
					<v-tab value="privacy" class="terms-tab">
						<v-icon class="mr-1">mdi-shield-account</v-icon>
						<span class="tab-text">Политика</span>
					</v-tab>
					<v-tab value="terms" class="terms-tab">
						<v-icon class="mr-1">mdi-file-document</v-icon>
						<span class="tab-text">Соглашение</span>
					</v-tab>
				</v-tabs>

				<v-window v-model="activeTab" class="terms-window">
					<!-- Политика конфиденциальности -->
					<v-window-item value="privacy">
						<v-card-text class="terms-content">
							<div class="text-h5 mb-4 text-primary">
								Политика конфиденциальности
							</div>
							<div class="text-body-1 mb-4">
								<strong>Дата последнего обновления:</strong> {{ new Date().toLocaleDateString('ru-RU') }}
							</div>

							<v-divider class="my-4"></v-divider>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">1. Общие положения</h3>
								<p class="mb-3">
									Настоящая Политика конфиденциальности определяет порядок обработки персональных данных 
									пользователей приложения ArcheAge Tracker (далее — «Приложение»). 
									Используя Приложение, вы автоматически соглашаетесь с условиями данной Политики.
								</p>
								<p class="mb-3">
									<strong>Важно:</strong> Регистрация в системе означает ваше полное согласие 
									на обработку персональных данных в соответствии с настоящей Политикой.
								</p>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">2. Сбор данных</h3>
								<p class="mb-3">
									Мы собираем следующие категории данных исключительно в статистических целях:
								</p>
								<ul class="mb-3 pl-4">
									<li class="mb-2">• Имя пользователя и email адрес</li>
									<li class="mb-2">• Данные об использовании Приложения (время сессий, активность)</li>
									<li class="mb-2">• Техническая информация (IP-адрес, тип устройства, браузер)</li>
									<li class="mb-2">• Игровые данные для трекинга прогресса</li>
									<li class="mb-2">• Логи ошибок и производительности</li>
								</ul>
								<p class="mb-3">
									<strong>Цель сбора:</strong> Все данные собираются исключительно для улучшения 
									качества сервиса, анализа использования и предоставления статистики.
								</p>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">3. Автоматическое согласие</h3>
								<p class="mb-3">
									При создании аккаунта в системе вы автоматически соглашаетесь:
								</p>
								<ul class="mb-3 pl-4">
									<li class="mb-2">• На обработку всех указанных выше данных</li>
									<li class="mb-2">• На использование данных для статистических целей</li>
									<li class="mb-2">• На соблюдение всех правил и условий Приложения</li>
									<li class="mb-2">• На получение уведомлений об обновлениях</li>
								</ul>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">4. Защита разработчика</h3>
								<p class="mb-3">
									Разработчик приложения не несет ответственности за:
								</p>
								<ul class="mb-3 pl-4">
									<li class="mb-2">• Потерю данных в результате технических сбоев</li>
									<li class="mb-2">• Несанкционированный доступ к аккаунтам пользователей</li>
									<li class="mb-2">• Изменения в игровой механике ArcheAge</li>
									<li class="mb-2">• Блокировку аккаунтов игроков администрацией игры</li>
									<li class="mb-2">• Временную недоступность сервиса</li>
								</ul>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">5. Использование данных</h3>
								<p class="mb-3">
									Собранные данные используются только для:
								</p>
								<ul class="mb-3 pl-4">
									<li class="mb-2">• Анализа эффективности Приложения</li>
									<li class="mb-2">• Улучшения пользовательского опыта</li>
									<li class="mb-2">• Предоставления статистических отчетов</li>
									<li class="mb-2">• Технической поддержки и отладки</li>
								</ul>
								<p class="mb-3">
									<strong>Гарантия:</strong> Данные не передаются третьим лицам и не используются 
									в коммерческих целях без вашего явного согласия.
								</p>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">6. Безопасность</h3>
								<p class="mb-3">
									Мы принимаем все необходимые меры для защиты ваших данных:
								</p>
								<ul class="mb-3 pl-4">
									<li class="mb-2">• Шифрование данных при передаче</li>
									<li class="mb-2">• Регулярное резервное копирование</li>
									<li class="mb-2">• Ограниченный доступ к данным</li>
									<li class="mb-2">• Мониторинг безопасности</li>
								</ul>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">7. Ваши права</h3>
								<p class="mb-3">
									Вы имеете право:
								</p>
								<ul class="mb-3 pl-4">
									<li class="mb-2">• Запросить информацию о ваших данных</li>
									<li class="mb-2">• Потребовать удаления аккаунта</li>
									<li class="mb-2">• Отозвать согласие на обработку данных</li>
									<li class="mb-2">• Получить копию ваших данных</li>
								</ul>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">8. Контакты</h3>
								<p class="mb-3">
									По вопросам обработки персональных данных обращайтесь через 
									систему обратной связи в Приложении.
								</p>
							</div>

							<v-alert type="info" variant="tonal" class="mt-6">
								<strong>Напоминание:</strong> Продолжая использовать Приложение, 
								вы подтверждаете свое согласие с данной Политикой конфиденциальности.
							</v-alert>
						</v-card-text>
					</v-window-item>

					<!-- Пользовательское соглашение -->
					<v-window-item value="terms">
						<v-card-text class="terms-content">
							<div class="text-h5 mb-4 text-primary">
								Пользовательское соглашение
							</div>
							<div class="text-body-1 mb-4">
								<strong>Дата последнего обновления:</strong> {{ new Date().toLocaleDateString('ru-RU') }}
							</div>

							<v-divider class="my-4"></v-divider>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">1. Принятие условий</h3>
								<p class="mb-3">
									Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует 
									отношения между пользователем и разработчиком приложения ArcheAge Tracker.
								</p>
								<p class="mb-3">
									<strong>Важно:</strong> Регистрация в системе означает ваше полное согласие 
									со всеми условиями данного Соглашения.
								</p>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">2. Описание сервиса</h3>
								<p class="mb-3">
									ArcheAge Tracker — это приложение для отслеживания прогресса в игре ArcheAge, 
									предоставляющее статистические данные и аналитику игрового процесса.
								</p>
								<p class="mb-3">
									Сервис предоставляется «как есть» и предназначен исключительно для 
									статистических и информационных целей.
								</p>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">3. Регистрация и аккаунт</h3>
								<p class="mb-3">
									При регистрации вы обязуетесь:
								</p>
								<ul class="mb-3 pl-4">
									<li class="mb-2">• Предоставлять достоверную информацию</li>
									<li class="mb-2">• Соблюдать все правила и ограничения</li>
									<li class="mb-2">• Не передавать аккаунт третьим лицам</li>
									<li class="mb-2">• Своевременно обновлять данные</li>
								</ul>
								<p class="mb-3">
									<strong>Автоматическое согласие:</strong> Создание аккаунта означает 
									автоматическое согласие со всеми правилами системы.
								</p>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">4. Ограничения ответственности</h3>
								<p class="mb-3">
									Разработчик не несет ответственности за:
								</p>
								<ul class="mb-3 pl-4">
									<li class="mb-2">• Потерю игрового прогресса или данных</li>
									<li class="mb-2">• Блокировку аккаунтов в игре ArcheAge</li>
									<li class="mb-2">• Изменения в игровой механике</li>
									<li class="mb-2">• Технические сбои и недоступность сервиса</li>
									<li class="mb-2">• Действия других пользователей</li>
									<li class="mb-2">• Ущерб от использования приложения</li>
								</ul>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">5. Запрещенные действия</h3>
								<p class="mb-3">
									Пользователям запрещается:
								</p>
								<ul class="mb-3 pl-4">
									<li class="mb-2">• Использовать приложение для мошенничества</li>
									<li class="mb-2">• Нарушать правила игры ArcheAge</li>
									<li class="mb-2">• Распространять вредоносное ПО</li>
									<li class="mb-2">• Попытки взлома или обхода ограничений</li>
									<li class="mb-2">• Создание множественных аккаунтов</li>
									<li class="mb-2">• Нарушение авторских прав</li>
								</ul>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">6. Интеллектуальная собственность</h3>
								<p class="mb-3">
									Все права на приложение ArcheAge Tracker принадлежат разработчику. 
									Пользователи не имеют права:
								</p>
								<ul class="mb-3 pl-4">
									<li class="mb-2">• Копировать или модифицировать код</li>
									<li class="mb-2">• Создавать производные продукты</li>
									<li class="mb-2">• Использовать в коммерческих целях</li>
									<li class="mb-2">• Обратно инжинирить приложение</li>
								</ul>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">7. Изменения в соглашении</h3>
								<p class="mb-3">
									Разработчик оставляет за собой право изменять условия Соглашения. 
									Продолжение использования приложения после изменений означает 
									согласие с новыми условиями.
								</p>
								<p class="mb-3">
									Пользователи будут уведомлены об изменениях через приложение 
									или по электронной почте.
								</p>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">8. Прекращение действия</h3>
								<p class="mb-3">
									Соглашение может быть прекращено:
								</p>
								<ul class="mb-3 pl-4">
									<li class="mb-2">• По инициативе пользователя (удаление аккаунта)</li>
									<li class="mb-2">• По инициативе разработчика (нарушение правил)</li>
									<li class="mb-2">• При прекращении работы сервиса</li>
								</ul>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">9. Применимое право</h3>
								<p class="mb-3">
									Настоящее Соглашение регулируется законодательством Российской Федерации. 
									Все споры разрешаются в судебном порядке.
								</p>
							</div>

							<div class="mb-6">
								<h3 class="text-h6 mb-3 text-primary">10. Контактная информация</h3>
								<p class="mb-3">
									По всем вопросам, связанным с настоящим Соглашением, 
									обращайтесь через систему обратной связи в Приложении.
								</p>
							</div>

							<v-alert type="warning" variant="tonal" class="mt-6">
								<strong>Внимание:</strong> Используя приложение, вы подтверждаете, 
								что прочитали, поняли и согласны соблюдать все условия данного Соглашения.
							</v-alert>
						</v-card-text>
					</v-window-item>
				</v-window>
			</v-card>
		</v-container>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeTab = ref('privacy')
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
}

.terms-content {
	padding: 0 24px 24px 24px;
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
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
