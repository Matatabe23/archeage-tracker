import { ERolePermission } from 'src/types/permissions/roles';

export const PERMISSIONS_ROLES = [
	{
		name: 'Создать роль',
		permission: ERolePermission.CREATE_ROLE
	},
	{
		name: 'Получить роли',
		permission: ERolePermission.GET_ROLES
	},
	{
		name: 'Обновить роли',
		permission: ERolePermission.UPDATE_ROLE
	},
	{
		name: 'Удалить роль',
		permission: ERolePermission.DELETE_ROLE
	}
];
