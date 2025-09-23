import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Games extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ unique: true })
	name: string; // Название игры

	@Column({ allowNull: true })
	shortDescription: string; // Краткое описание

	@Column({ type: DataType.TEXT, allowNull: true })
	description: string; // Полное описание

	@Column({ allowNull: true })
	iconPath: string; // Часть ссылки на иконку (относительный путь)

	@Column({ allowNull: true })
	officialSiteUrl: string; // Ссылка на официальный сайт игры

	@Column({ allowNull: true })
	genre: string; // Жанр(ы), строка через запятую

	@Column({ allowNull: true })
	developer: string; // Разработчик

	@Column({ allowNull: true })
	publisher: string; // Издатель

	@Column({ type: DataType.DATEONLY, allowNull: true })
	releaseDate: Date; // Дата выхода (если известна)

	@Column({ allowNull: true })
	platforms: string; // Платформы, строка через запятую (pc, xbox, ps, mobile)

	@Column({ type: DataType.FLOAT, allowNull: true })
	rating: number; // Оценка/рейтинг (0-10)

	@Column({ defaultValue: true })
	isActive: boolean; // Активна ли игра в системе

	@Column({ allowNull: true })
	tags: string; // Доп. метки, строка через запятую

	@Column({ allowNull: true })
	metadata: string; // Произвольные данные в виде JSON-строки

	@Column({ defaultValue: DataType.NOW })
	createdAt: Date;

	@Column({ defaultValue: DataType.NOW })
	updatedAt: Date;
}
