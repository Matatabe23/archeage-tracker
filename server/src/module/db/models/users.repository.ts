import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Users extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ unique: true })
	name: string;

	@Column({ allowNull: true })
	avatarUrl: string;

	@Column({ defaultValue: false })
	isTeamMember: boolean;

	@Column({ defaultValue: 0 })
	coin: number;
}
