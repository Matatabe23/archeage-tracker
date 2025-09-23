// Типы для структуры данных
export interface IDocumentSection {
	title: string;
	content: string;
	items?: string[];
	highlight?: string;
}

export interface IDocumentData {
	title: string;
	lastUpdated: string;
	sections: IDocumentSection[];
	alert?: {
		type: 'info' | 'warning' | 'error' | 'success';
		message: string;
	};
}
