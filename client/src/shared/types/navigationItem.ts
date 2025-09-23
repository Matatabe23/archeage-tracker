export interface NavigationItem {
	title: string;
	path?: string;
	icon?: string;
	visible?: boolean;
	children?: NavigationItem[];
	open?: boolean; // ⬅️ нужно добавить для v-model
}