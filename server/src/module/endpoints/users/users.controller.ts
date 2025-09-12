import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from 'src/module/db/models/users.repository';
import { CreateUserDoc } from './decorators/create-user.decorator';
import { LoginUserDto } from './dto/login.dto';
import { LoginrDoc } from './decorators/login.decorator';
@Controller('user')
@ApiTags('Пользователи')
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Post('create-user')
	@CreateUserDoc()
	async createUser(@Body() dto: CreateUserDto): Promise<Users> {
		return this.userService.createUser(dto);
	}

	@Get('verify-email')
	async verifyEmail(@Query('token') token: string) {
		await this.userService.confirmEmail(token);
		return { message: 'Email успешно подтверждён' };
	}

	@Post('login')
	@LoginrDoc()
	async login(@Body() dto: LoginUserDto, @Req() req: Request) {
		return this.userService.login(dto, req);
	}
}
