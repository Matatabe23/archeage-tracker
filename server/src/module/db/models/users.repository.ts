import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { RefreshToken } from './refresh-token.repository';

@Table
export class Users extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number; // Уникальный идентификатор пользователя

	@Column({ unique: true })
	name: string; // Уникальное имя пользователя

	@Column({ unique: true })
	email: string; // Уникальный email адрес

	@Column({ allowNull: true })
	avatarUrl: string; // URL аватара пользователя

	@Column({ allowNull: true })
	firstName: string; // Имя

	@Column({ allowNull: true })
	lastName: string; // Фамилия

	@Column({ allowNull: true })
	phone: string; // Номер телефона

	@Column({ allowNull: true })
	dateOfBirth: Date; // Дата рождения

	@Column({ allowNull: true })
	country: string; // Страна

	@Column({ allowNull: true })
	city: string; // Город

	@Column({ allowNull: true })
	timezone: string; // Часовой пояс

	@Column({ allowNull: true })
	language: string; // Предпочитаемый язык

	@Column({ defaultValue: true })
	isActive: boolean; // Активен ли пользователь

	@Column({ defaultValue: false })
	isEmailVerified: boolean; // Подтвержден ли email

	@Column({ allowNull: true })
	lastLoginAt: Date; // Время последнего входа

	@Column({ allowNull: true })
	lastActivityAt: Date; // Время последней активности

	@Column({ allowNull: true })
	passwordHash: string; // Хеш пароля

	@Column({ allowNull: true })
	twoFactorSecret: string; // Секрет для двухфакторной аутентификации

	@Column({ defaultValue: false })
	twoFactorEnabled: boolean; // Включена ли двухфакторная аутентификация

	@Column({ allowNull: true })
	preferences: string; // JSON строка с настройками пользователя

	@Column({ allowNull: true })
	metadata: string; // JSON строка с дополнительными данными пользователя

	@Column({ defaultValue: DataType.NOW })
	createdAt: Date; // Время создания записи

	@Column({ defaultValue: DataType.NOW })
	updatedAt: Date; // Время последнего обновления записи

	@Column({ allowNull: true })
	emailVerificationToken: string; // токен для подтверждения email

	@Column({ allowNull: true })
	emailVerificationExpiresAt: Date; // время истечения токена

	// Связь с refresh токенами (один пользователь - много токенов)
	@HasMany(() => RefreshToken, { foreignKey: 'userId', as: 'refreshTokens' })
	refreshTokens: RefreshToken[];
}
