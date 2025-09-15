import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRolesDto } from './dto/get-roles.dto';
import { CreateRoleDoc } from './decorators/create-role.decorator';
import { UpdateRoleDoc } from './decorators/update-role.decorator';
import { DeleteRoleDoc } from './decorators/delete-role.decorator';
import { GetRolesDoc } from './decorators/get-roles.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('roles')
@ApiTags('Роли')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@Post()
	@CreateRoleDoc()
	async create(@Body() dto: CreateRoleDto) {
		return this.rolesService.create(dto);
	}

	@Patch(':id')
	@UpdateRoleDoc()
	async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRoleDto) {
		return this.rolesService.update(id, dto);
	}

	@Delete(':id')
	@DeleteRoleDoc()
	async remove(@Param('id', ParseIntPipe) id: number) {
		return this.rolesService.remove(id);
	}

	@Get()
	@GetRolesDoc()
	async list(@Query() query: GetRolesDto) {
		return this.rolesService.list(query);
	}
}
