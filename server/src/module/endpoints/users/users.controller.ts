import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiTags } from '@nestjs/swagger';
@Controller('user')
@ApiTags('Пользователи')
export class UsersController {
	constructor(private readonly userService: UsersService) {}
}
