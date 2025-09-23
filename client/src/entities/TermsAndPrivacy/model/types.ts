// Типы для структуры данных
export interface DocumentSection {
	title: string;
	content: string;
	items?: string[];
	highlight?: string;
}

export interface DocumentData {
	title: string;
	lastUpdated: string;
	sections: DocumentSection[];
	alert?: {
		type: 'info' | 'warning' | 'error' | 'success';
		message: string;
	};
}
