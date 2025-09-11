import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/module/db/models/users.repository';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(Users)
		private readonly usersRepository: typeof Users
	) {}
}
