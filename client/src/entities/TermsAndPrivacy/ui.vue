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
						v-for="tab in documentTabs"
						:key="tab.value"
						:value="tab.value"
						class="terms-tab"
					>
						<v-icon class="mr-1">{{ tab.icon }}</v-icon>
						<span class="tab-text">{{ tab.label }}</span>
					</v-tab>
				</v-tabs>

				<v-window
					v-model="activeTab"
					class="terms-window"
				>
					<v-window-item
						v-for="tab in documentTabs"
						:key="tab.value"
						:value="tab.value"
					>
						<v-card-text class="terms-content">
							<div class="text-h5 mb-4 text-primary">
								{{ tab.data.title }}
							</div>
							<div class="text-body-1 mb-4">
								<strong>Дата последнего обновления:</strong>
								{{ tab.data.lastUpdated }}
							</div>

							<v-divider class="my-4"></v-divider>

							<div
								v-for="section in tab.data.sections"
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
								v-if="tab.data.alert"
								:type="tab.data.alert.type"
								variant="tonal"
								class="mt-6"
							>
								<strong
									>{{ tab.data.alert.message.split(':')[0] }}:</strong
								>
								{{
									tab.data.alert.message
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
	import { documentTabs } from './consts';

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
