import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Users } from './users.repository';

@Table
export class UserTempData extends Model {
	@Column({ primaryKey: true, autoIncrement: true })
	id: number; // Уникальный идентификатор записи

	@ForeignKey(() => Users)
	@Column({ unique: true })
	userId: number; // ID пользователя (внешний ключ, уникальный)

	@Column({ allowNull: true })
	emailVerificationToken: string; // токен для подтверждения email

	@Column({ allowNull: true })
	emailVerificationExpiresAt: Date; // время истечения токена подтверждения email

	@Column({ allowNull: true })
	passwordResetToken: string; // токен для восстановления пароля

	@Column({ allowNull: true })
	passwordResetExpiresAt: Date; // время истечения токена восстановления пароля

	@Column({ allowNull: true })
	twoFactorCode: string; // код двухфакторной аутентификации

	@Column({ allowNull: true })
	twoFactorExpiresAt: Date; // время истечения кода двухфакторной аутентификации

	@Column({ allowNull: true })
	phoneVerificationCode: string; // код подтверждения телефона

	@Column({ allowNull: true })
	phoneVerificationExpiresAt: Date; // время истечения кода подтверждения телефона

	@Column({ defaultValue: DataType.NOW })
	createdAt: Date; // Время создания записи

	@Column({ defaultValue: DataType.NOW })
	updatedAt: Date; // Время последнего обновления записи

	// Связь с пользователем
	@BelongsTo(() => Users)
	user: Users;
}
