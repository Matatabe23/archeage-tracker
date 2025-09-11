import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from 'src/module/db/models/users.repository';
import { CreateUserDoc } from './decorators/create-user.decorator';
@Controller('user')
@ApiTags('Пользователи')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Post('create-user')
	@CreateUserDoc()
	async createUser(@Body() dto: CreateUserDto): Promise<Users> {
		return this.userService.createUser(dto);
	}
}
