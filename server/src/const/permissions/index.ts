import { PERMISSIONS_USERS } from './users';
import { PERMISSIONS_ROLES } from './roles';
import { PERMISSIONS_GAMES } from './games';
import { PERMISSIONS_CHARACTERS } from './characters';

export const PERMISSIONS = [
	...PERMISSIONS_USERS,
	...PERMISSIONS_ROLES,
	...PERMISSIONS_GAMES,
	...PERMISSIONS_CHARACTERS
];
