import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Roles extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number; // Уникальный идентификатор роли

	@Column({ unique: true })
	nameRu: string; // Имя роли на русском

	@Column({ unique: true })
	nameEn: string; // Имя роли на английском

	@Column({ type: DataType.TEXT, defaultValue: '' })
	permissions: string; // Права роли (строка через запятую)

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		defaultValue: 0
	})
	priority: number;
	// Важность роли: чем выше число, тем выше статус
	// Определяет, кто может назначать/снимать роли и банить других

	@Column({
		type: DataType.STRING,
		allowNull: false,
		defaultValue: '#fff'
	})
	color: string; // Цвет роли (HEX, RGB или HSL)

	@Column({ allowNull: true })
	description: string; // Описание роли (опционально)

	@Column({ defaultValue: DataType.NOW })
	createdAt: Date;

	@Column({ defaultValue: DataType.NOW })
	updatedAt: Date;
}
