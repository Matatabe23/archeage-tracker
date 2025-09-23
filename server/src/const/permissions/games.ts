import { EGamePermission } from 'src/types/permissions/games';

export const PERMISSIONS_GAMES = [
	{
		name: 'Создать игру',
		permission: EGamePermission.CREATE_GAME
	},
	{
		name: 'Получить игры',
		permission: EGamePermission.GET_GAMES
	},
	{
		name: 'Обновить игру',
		permission: EGamePermission.UPDATE_GAME
	},
	{
		name: 'Удалить игру',
		permission: EGamePermission.DELETE_GAME
	}
];


