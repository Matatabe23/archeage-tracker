import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Users } from './users.repository';
import { Roles } from './roles.repository';

@Table
export class UserRoles extends Model {
	@ForeignKey(() => Users)
	@Column
	userId: number;

	@ForeignKey(() => Roles)
	@Column
	roleId: number;
}
