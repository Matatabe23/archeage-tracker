import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/module/db/models/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { MailRepository } from 'src/module/service/mail/mail.repository';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(Users)
		private readonly usersRepository: typeof Users,
		private readonly mailRepository: MailRepository,
		private readonly sequelize: Sequelize // для транзакций
	) {}

	async createUser(dto: CreateUserDto): Promise<Users> {
		// Создаём транзакцию
		const transaction = await this.sequelize.transaction();

		try {
			const candidate = await this.usersRepository.findOne({
				where: { email: dto.email },
				transaction
			});
			if (candidate) {
				throw new BadRequestException('Пользователь с таким email уже существует');
			}

			// Хэшируем пароль
			const hashPassword = await bcrypt.hash(dto.password, 10);

			// Создаём нового пользователя в транзакции
			const user = await this.usersRepository.create(
				{
					name: dto.name,
					email: dto.email,
					passwordHash: hashPassword,
					firstName: dto.firstName,
					lastName: dto.lastName,
					phone: dto.phone,
					isActive: true,
					isEmailVerified: false
				},
				{ transaction }
			);

			// Отправляем письмо — ждём результата
			await this.mailRepository.sendMail({
				to: dto.email,
				subject: 'Подтверждение почты',
				text: '123'
			});

			// Если всё прошло успешно — коммитим транзакцию
			await transaction.commit();

			return user;
		} catch (error) {
			// При любой ошибке — откатываем транзакцию
			await transaction.rollback();
			throw new InternalServerErrorException(error.message);
		}
	}
}
