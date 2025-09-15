import { Users } from './users.repository';
import { RefreshToken } from './refresh-token.repository';
import { Roles } from './roles.repository';
import { UserRoles } from './user-roles.repository';

export const usersDBList = [Users, RefreshToken, UserRoles, Roles];
