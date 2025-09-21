import {
	Body,
	Controller,
	Get,
	Post,
	Query,
	Req,
	UseGuards,
	Patch,
	Param,
	ParseIntPipe
} from '@nestjs/common';
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
import { UpdateUserDto, UpdateUserRolesDto } from './dto/update-user.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ConfirmPasswordResetDto } from './dto/confirm-password-reset.dto';
import { UpdateUserDoc, UpdateUserRolesDoc } from './decorators/update-user.decorator';
import { RequestPasswordResetDoc } from './decorators/request-password-reset.decorator';
import { ConfirmPasswordResetDoc } from './decorators/confirm-password-reset.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { EUserPermission } from 'src/types/permissions/users';
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

	@Post('request-password-reset')
	@RequestPasswordResetDoc()
	async requestPasswordReset(@Body() dto: RequestPasswordResetDto) {
		return this.userService.requestPasswordReset(dto);
	}

	@Post('confirm-password-reset')
	@ConfirmPasswordResetDoc()
	async confirmPasswordReset(@Body() dto: ConfirmPasswordResetDto) {
		return this.userService.confirmPasswordReset(dto);
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

	@Patch('me')
	@ApiBearerAuth('access-token')
	@UseGuards(AuthGuard)
	@UpdateUserDoc()
	async updateUser(@Req() req: any, @Body() dto: UpdateUserDto) {
		return this.userService.updateUser(req.user.sub, dto);
	}

	@Patch(':id/roles')
	@ApiBearerAuth('access-token')
	@UseGuards(AuthGuard, RolesGuard)
	@UpdateUserRolesDoc()
	@Roles(EUserPermission.UPDATE_USER_ROLES)
	async updateUserRoles(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserRolesDto) {
		return this.userService.updateUserRoles(id, dto);
	}

	@Get('check-auth')
	@ApiBearerAuth('access-token')
	@UseGuards(AuthGuard)
	@GetProfileDoc()
	async checkAuth(@Req() req: any) {
		return this.userService.getProfile(req.user.sub);
	}
}
