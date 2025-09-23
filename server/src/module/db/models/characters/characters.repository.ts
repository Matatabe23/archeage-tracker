import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Users } from '../users/users.repository';
import { Games } from '../games/games.repository';

@Table
export class Characters extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column
	name: string; // Имя персонажа

	@ForeignKey(() => Users)
	@Column
	userId: number; // Принадлежит пользователю

	@ForeignKey(() => Games)
	@Column
	gameId: number; // Принадлежит игре

	@Column({ allowNull: true })
	className: string; // Класс/архетип

	@Column({ allowNull: true })
	level: string; // Уровень (строка, т.к. в разных играх по-разному)

	@Column({ type: DataType.TEXT, allowNull: true })
	description: string; // Описание персонажа

	@Column({ allowNull: true })
	metadata: string; // JSON строка

	@Column({ defaultValue: DataType.NOW })
	createdAt: Date;

	@Column({ defaultValue: DataType.NOW })
	updatedAt: Date;

	@BelongsTo(() => Users, { foreignKey: 'userId', as: 'user' })
	user: Users;

	@BelongsTo(() => Games, { foreignKey: 'gameId', as: 'game' })
	game: Games;
}
