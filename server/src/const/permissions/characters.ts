import { ECharacterPermission } from 'src/types/permissions/characters';

export const PERMISSIONS_CHARACTERS = [
	{ name: 'Создать персонажа', permission: ECharacterPermission.CREATE_CHARACTER },
	{ name: 'Получить персонажей', permission: ECharacterPermission.GET_CHARACTERS },
	{ name: 'Обновить персонажа', permission: ECharacterPermission.UPDATE_CHARACTER },
	{ name: 'Удалить персонажа', permission: ECharacterPermission.DELETE_CHARACTER }
];


