import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/module/db/models/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { MailRepository } from 'src/module/service/mail/mail.repository';
import { Sequelize } from 'sequelize-typescript';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(Users)
		private readonly usersRepository: typeof Users,
		private readonly mailRepository: MailRepository,
		private readonly sequelize: Sequelize // для транзакций
	) {}

	async createUser(dto: CreateUserDto): Promise<Users> {
		const transaction = await this.sequelize.transaction();

		try {
			const candidate = await this.usersRepository.findOne({
				where: { email: dto.email },
				transaction
			});
			if (candidate) {
				throw new BadRequestException('Пользователь с таким email уже существует');
			}

			const hashPassword = await bcrypt.hash(dto.password, 10);

			// Генерируем токен для подтверждения email
			const token = randomBytes(32).toString('hex');
			const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 минут

			const user = await this.usersRepository.create(
				{
					name: dto.name,
					email: dto.email,
					passwordHash: hashPassword,
					firstName: dto.firstName,
					lastName: dto.lastName,
					phone: dto.phone,
					isActive: true,
					isEmailVerified: false,
					emailVerificationToken: token,
					emailVerificationExpiresAt: expiresAt
				},
				{ transaction }
			);

			// Ссылка для подтверждения
			const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

			await this.mailRepository.sendMail({
				to: dto.email,
				subject: 'Подтвердите вашу почту',
				html: `<p>Перейдите по ссылке, чтобы подтвердить email:</p><a href="${verificationUrl}">${verificationUrl}</a>`
			});

			await transaction.commit();

			setTimeout(
				async () => {
					const userToCheck = await this.usersRepository.findByPk(user.id);
					if (userToCheck && !userToCheck.isEmailVerified) {
						await userToCheck.destroy(); // полностью удаляем запись
						console.log(
							`Пользователь ${userToCheck.email} удалён (не подтвердил email)`
						);
					}
				},
				17 * 60 * 1000 // через 17 минут
			);

			const userObj = user.get({ plain: true });

			// Удаляем чувствительные поля
			delete userObj.passwordHash;
			delete userObj.emailVerificationToken;
			delete userObj.emailVerificationExpiresAt;

			return userObj;
		} catch (error) {
			await transaction.rollback();
			throw new InternalServerErrorException(error.message);
		}
	}

	async confirmEmail(token: string): Promise<{ message: string }> {
		const user = await this.usersRepository.findOne({
			where: { emailVerificationToken: token }
		});

		if (!user) {
			throw new BadRequestException('Неверный токен');
		}

		if (user.isEmailVerified) {
			return { message: 'Email уже подтверждён. Вы можете пользоваться аккаунтом.' };
		}

		if (user.emailVerificationExpiresAt < new Date()) {
			// Токен истёк — полностью удаляем запись из базы
			await user.destroy(); // <-- удаляем полностью
			throw new BadRequestException('Ссылка устарела.');
		}

		user.isEmailVerified = true;
		user.emailVerificationToken = null;
		user.emailVerificationExpiresAt = null;
		await user.save();

		return { message: 'Email успешно подтверждён. Вы можете пользоваться аккаунтом.' };
	}
}
