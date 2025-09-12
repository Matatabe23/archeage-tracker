import {
	Injectable,
	BadRequestException,
	InternalServerErrorException,
	UnauthorizedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/module/db/models/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { MailRepository } from 'src/module/service/mail/mail.repository';
import { Sequelize } from 'sequelize-typescript';
import { randomBytes } from 'crypto';
import { Op } from 'sequelize';
import { TokenRepository } from 'src/module/service/token/token.repository';
import { RefreshToken } from 'src/module/db/models/refresh-token.repository';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(Users)
		private readonly usersRepository: typeof Users,
		@InjectModel(RefreshToken)
		private readonly refreshToken: typeof RefreshToken,
		private readonly mailRepository: MailRepository,
		private readonly sequelize: Sequelize,
		private readonly tokenRepository: TokenRepository
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

	async login(
		loginOrEmail: string,
		password: string,
		deviceInfo: {
			deviceName?: string;
			deviceType?: string;
			userAgent?: string;
			ipAddress?: string;
		} = {},
		req?: Request
	): Promise<{ user: any; accessToken: string; refreshToken: string; message: string }> {
		// Ищем пользователя по email или имени
		const user = await this.usersRepository.findOne({
			where: {
				[Op.or]: [{ email: loginOrEmail }, { name: loginOrEmail }]
			}
		});

		if (!user) {
			throw new UnauthorizedException('Пользователь не найден');
		}

		if (!user.isEmailVerified) {
			throw new UnauthorizedException('Email не подтверждён');
		}

		// Проверяем пароль
		const passwordMatches = await bcrypt.compare(password, user.passwordHash);
		if (!passwordMatches) {
			throw new UnauthorizedException('Неверный пароль');
		}

		// Убираем лишние поля
		const userObj = user.get({ plain: true });
		delete userObj.passwordHash;
		delete userObj.emailVerificationToken;
		delete userObj.emailVerificationExpiresAt;

		// --- Создание токенов ---
		const payload = { sub: user.id, email: user.email };

		const accessToken = this.tokenRepository.sign(payload, {
			secret: process.env.JWT_ACCESS_SECRET,
			expiresIn: '15m'
		});

		const refreshToken = this.tokenRepository.sign(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: '30d'
		});

		// Собираем deviceInfo (приоритет у переданных данных)
		const finalDeviceInfo = {
			deviceName: deviceInfo.deviceName || 'unknown',
			deviceType: deviceInfo.deviceType || 'web',
			userAgent: deviceInfo.userAgent || req?.headers['user-agent'] || 'unknown',
			ipAddress:
				deviceInfo.ipAddress ||
				(req?.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
		};

		// Сохраняем refresh в БД
		await this.refreshToken.create({
			userId: user.id,
			token: refreshToken,
			...finalDeviceInfo,
			isActive: true,
			isRevoked: false,
			expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 дней
		});

		return {
			user: userObj,
			accessToken,
			refreshToken,
			message: 'Вход выполнен успешно'
		};
	}
}
