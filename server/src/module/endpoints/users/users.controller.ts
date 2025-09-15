import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from 'src/module/db/models/users/users.repository';
import { CreateUserDoc } from './decorators/create-user.decorator';
import { LoginUserDto } from './dto/login.dto';
import { LoginrDoc } from './decorators/login.decorator';
import { RefreshTokenDoc } from './decorators/refresh-token.decorator';
import { LogoutDoc } from './decorators/logout.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { GetProfileDoc } from './decorators/get-profile.decorator';
import { Roles } from 'src/decorators/roles.decorator';
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

	@Post('refresh-token')
	@RefreshTokenDoc()
	async refreshToken(@Body('refreshToken') token: string) {
		return this.userService.refreshAccessToken(token);
	}

	@Post('logout')
	@ApiBearerAuth('access-token')
	@UseGuards(AuthGuard)
	@LogoutDoc()
	async logout(@Body('refreshToken') token: string) {
		return this.userService.logout(token);
	}

	@Get('me')
	@ApiBearerAuth('access-token')
	@UseGuards(AuthGuard)
	@GetProfileDoc()
	@Roles()
	async getProfile(@Req() req: any) {
		return this.userService.getProfile(req.user.sub);
	}
}
