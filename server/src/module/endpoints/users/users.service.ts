import {
	Injectable,
	BadRequestException,
	InternalServerErrorException,
	UnauthorizedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/module/db/models/users/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { MailRepository } from 'src/module/service/mail/mail.repository';
import { Sequelize } from 'sequelize-typescript';
import { randomBytes } from 'crypto';
import { Op } from 'sequelize';
import { TokenRepository } from 'src/module/service/token/token.repository';
import { RefreshToken } from 'src/module/db/models/users/refresh-token.repository';
import { LoginUserDto } from './dto/login.dto';
import { UpdateUserDto, UpdateUserRolesDto } from './dto/update-user.dto';
import { Roles } from 'src/module/db/models/users/roles.repository';
import { UserRoles } from 'src/module/db/models/users/user-roles.repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(Users)
		private readonly usersRepository: typeof Users,
		@InjectModel(RefreshToken)
		private readonly refreshToken: typeof RefreshToken,
		@InjectModel(Roles)
		private readonly rolesRepository: typeof Roles,
		@InjectModel(UserRoles)
		private readonly userRolesRepository: typeof UserRoles,
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
		loginDto: LoginUserDto,
		req?: Request
	): Promise<{ user: any; accessToken: string; refreshToken: string; message: string }> {
		const { loginOrEmail, password, deviceInfo } = loginDto;

		// --- Поиск пользователя с ролями ---
		const user = await this.usersRepository.findOne({
			where: {
				[Op.or]: [{ email: loginOrEmail }, { name: loginOrEmail }]
			},
			include: [{ model: Roles, through: { attributes: [] } }]
		});
		if (!user) throw new UnauthorizedException('Пользователь не найден');
		if (!user.isEmailVerified) throw new UnauthorizedException('Email не подтверждён');

		// --- Проверка пароля ---
		const passwordMatches = await bcrypt.compare(password, user.passwordHash);
		if (!passwordMatches) throw new UnauthorizedException('Неверный пароль');

		// --- Подготовка объекта пользователя без чувствительных полей ---
		const userObj = user.get({ plain: true });
		delete userObj.passwordHash;
		delete userObj.emailVerificationToken;
		delete userObj.emailVerificationExpiresAt;

		// --- Создание токенов с ролями ---
		const userRoles =
			user.roles
				?.map((role) => role.permissions)
				.join(',')
				.split(',')
				.filter(Boolean) || [];
		const payload = {
			sub: user.id,
			email: user.email,
			roles: userRoles
		};
		const accessToken = this.tokenRepository.sign(payload, {
			secret: process.env.JWT_ACCESS_SECRET,
			expiresIn: '15m'
		});
		const refreshToken = this.tokenRepository.sign(payload, {
			secret: process.env.JWT_REFRESH_SECRET,
			expiresIn: '30d'
		});

		// --- Сбор deviceInfo и гео ---
		const finalDeviceInfo = {
			deviceName: deviceInfo?.deviceName || 'unknown',
			deviceType: deviceInfo?.deviceType || 'web',
			userAgent: deviceInfo?.userAgent || req?.headers['user-agent'] || 'unknown',
			ipAddress:
				deviceInfo?.ipAddress ||
				(req?.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
				'unknown',
			location: deviceInfo?.location || null,
			latitude: deviceInfo?.latitude || null,
			longitude: deviceInfo?.longitude || null,
			country: deviceInfo?.country || null,
			city: deviceInfo?.city || null,
			region: deviceInfo?.region || null,
			timezone: deviceInfo?.timezone || null,
			metadata: deviceInfo?.metadata ? JSON.stringify(deviceInfo.metadata) : null
		};

		// --- Сохраняем refresh токен в БД ---
		await this.refreshToken.create({
			userId: user.id,
			token: refreshToken,
			...finalDeviceInfo,
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

	async refreshAccessToken(
		refreshToken: string
	): Promise<{ accessToken: string; refreshToken: string }> {
		const tokenRecord = await this.refreshToken.findOne({
			where: { token: refreshToken, isRevoked: false }
		});

		if (!tokenRecord) {
			throw new UnauthorizedException('Недействительный refresh токен');
		}

		if (tokenRecord.expiresAt < new Date()) {
			throw new UnauthorizedException('Refresh токен истёк');
		}

		// --- Проверка подписи токена ---
		let payload: any;
		try {
			payload = this.tokenRepository.verifyToken(
				refreshToken,
				process.env.JWT_REFRESH_SECRET
			);
		} catch (err) {
			throw new UnauthorizedException('Неверный refresh токен');
		}

		const user = await this.usersRepository.findByPk(payload.sub, {
			include: [{ model: Roles, through: { attributes: [] } }]
		});
		if (!user) {
			throw new UnauthorizedException('Пользователь не найден');
		}

		// --- Создаём новый access токен с ролями ---
		const userRoles =
			user.roles
				?.map((role) => role.permissions)
				.join(',')
				.split(',')
				.filter(Boolean) || [];
		const newAccessToken = this.tokenRepository.sign(
			{
				sub: user.id,
				email: user.email,
				roles: userRoles
			},
			{ secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' }
		);

		// Можно обновить срок жизни refresh токена, если хочешь «скользящее» окно
		// tokenRecord.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
		// await tokenRecord.save();

		return {
			accessToken: newAccessToken,
			refreshToken // возвращаем тот же refresh (или можно сгенерировать новый и заменить в БД)
		};
	}

	async logout(refreshToken: string): Promise<{ message: string }> {
		const tokenRecord = await this.refreshToken.findOne({
			where: { token: refreshToken, isRevoked: false }
		});

		if (!tokenRecord) {
			throw new UnauthorizedException('Токен не найден или уже неактивен');
		}

		tokenRecord.isRevoked = true;
		await tokenRecord.save();

		return { message: 'Вы успешно вышли из системы' };
	}

	async getProfile(userId: number): Promise<any> {
		const user = await this.usersRepository.findByPk(userId);

		if (!user) {
			throw new UnauthorizedException('Пользователь не найден');
		}

		const userObj = user.get({ plain: true });
		delete userObj.passwordHash;
		delete userObj.emailVerificationToken;
		delete userObj.emailVerificationExpiresAt;

		return userObj;
	}

	async updateUser(userId: number, dto: UpdateUserDto): Promise<Users> {
		const user = await this.usersRepository.findByPk(userId);
		if (!user) {
			throw new NotFoundException('Пользователь не найден');
		}

		// Проверяем уникальность email, если он изменяется
		if (dto.email && dto.email !== user.email) {
			const existingUser = await this.usersRepository.findOne({
				where: { email: dto.email }
			});
			if (existingUser) {
				throw new BadRequestException('Пользователь с таким email уже существует');
			}
		}

		// Проверяем уникальность имени, если оно изменяется
		if (dto.name && dto.name !== user.name) {
			const existingUser = await this.usersRepository.findOne({
				where: { name: dto.name }
			});
			if (existingUser) {
				throw new BadRequestException('Пользователь с таким именем уже существует');
			}
		}

		// Обновляем поля пользователя
		Object.assign(user, dto);
		await user.save();

		return user.get({ plain: true }) as any;
	}

	async updateUserRoles(userId: number, dto: UpdateUserRolesDto): Promise<any> {
		const user = await this.usersRepository.findByPk(userId);
		if (!user) {
			throw new NotFoundException('Пользователь не найден');
		}

		// Если роли не переданы, возвращаем текущие роли пользователя
		if (!dto.roleIds || dto.roleIds.length === 0) {
			const userWithRoles = await this.usersRepository.findByPk(userId, {
				include: [{ model: Roles, through: { attributes: [] } }]
			});
			return {
				message: 'Роли пользователя получены',
				user: userWithRoles.get({ plain: true }),
				roles: userWithRoles.roles
			};
		}

		// Проверяем существование всех ролей
		const roles = await this.rolesRepository.findAll({
			where: { id: dto.roleIds }
		});

		if (roles.length !== dto.roleIds.length) {
			throw new BadRequestException('Одна или несколько ролей не найдены');
		}

		// Удаляем все существующие связи пользователя с ролями
		await this.userRolesRepository.destroy({
			where: { userId }
		});

		// Создаем новые связи с ролями
		const userRoles = dto.roleIds.map((roleId) => ({
			userId,
			roleId
		}));

		await this.userRolesRepository.bulkCreate(userRoles);

		// Получаем обновленного пользователя с ролями
		const userWithRoles = await this.usersRepository.findByPk(userId, {
			include: [{ model: Roles, through: { attributes: [] } }]
		});

		return {
			message: 'Роли успешно назначены пользователю',
			user: userWithRoles.get({ plain: true })
		};
	}
}
