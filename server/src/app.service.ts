import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Roles } from './module/db/models/users/roles.repository';
import { PERMISSIONS } from './const/permissions';

@Injectable()
export class AppService {
	constructor(
		@InjectModel(Roles)
		private readonly roles: typeof Roles
	) {}

	getHello(): string {
		return 'Hello World!';
	}

	async getMainInfo() {
		const listRoles = await this.roles.findAll();

		return {
			listRoles,
			data: {
				PERMISSIONS
			}
		};
	}
}
