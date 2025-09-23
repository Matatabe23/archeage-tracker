import { IDocumentData } from './types';

// Интерфейс для конфигурации вкладки
export interface ITabConfig {
	value: string;
	label: string;
	icon: string;
	data: IDocumentData;
}
