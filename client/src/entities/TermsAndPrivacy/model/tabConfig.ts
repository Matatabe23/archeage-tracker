import { DocumentData } from './types';

// Интерфейс для конфигурации вкладки
export interface TabConfig {
	value: string;
	label: string;
	icon: string;
	data: DocumentData;
}
