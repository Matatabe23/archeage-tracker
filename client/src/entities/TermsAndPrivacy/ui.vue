<template>
	<div class="min-h-screen bg-gradient-to-br from-green-950 to-green-900 flex items-center justify-center p-4">
		<v-container class="max-w-4xl">
			<v-card class="pa-6" elevation="8">
				<v-card-title class="text-h4 text-center mb-6 text-primary">
					Правовая информация
				</v-card-title>
				
				<v-tabs
					v-model="activeTab"
					centered
					color="primary"
					class="mb-6"
				>
					<v-tab value="privacy">
						<v-icon class="mr-2">mdi-shield-account</v-icon>
						Политика конфиденциальности
					</v-tab>
					<v-tab value="terms">
						<v-icon class="mr-2">mdi-file-document</v-icon>
						Пользовательское соглашение
					</v-tab>
				</v-tabs>

				<v-window v-model="activeTab">
					<!-- Политика конфиденциальности -->
					<v-window-item value="privacy">
						<v-card-text class="pa-0">
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
						<v-card-text class="pa-0">
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
.v-card {
	border-radius: 16px;
}

.v-tabs {
	border-radius: 12px;
}

.v-window-item {
	overflow-y: auto;
	max-height: 70vh;
}

@media (max-width: 768px) {
	.v-container {
		padding: 8px;
	}
	
	.v-card {
		padding: 16px !important;
	}
	
	.v-window-item {
		max-height: 60vh;
	}
	
	.text-h4 {
		font-size: 1.5rem !important;
	}
	
	.text-h5 {
		font-size: 1.25rem !important;
	}
	
	.text-h6 {
		font-size: 1.1rem !important;
	}
}

@media (max-width: 480px) {
	.v-card {
		padding: 12px !important;
	}
	
	.v-tab {
		font-size: 0.875rem !important;
		padding: 8px 12px !important;
	}
	
	.v-icon {
		font-size: 1.2rem !important;
	}
}
</style>
