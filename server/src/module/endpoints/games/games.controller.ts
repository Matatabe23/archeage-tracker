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
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GetGamesDto } from './dto/get-games.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { EGamePermission } from 'src/types/permissions/games';

@Controller('games')
@ApiTags('Игры')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, RolesGuard)
export class GamesController {
	constructor(private readonly gamesService: GamesService) {}

	@Post()
	@Roles(EGamePermission.CREATE_GAME)
	async create(@Body() dto: CreateGameDto) {
		return this.gamesService.create(dto);
	}

	@Patch(':id')
	@Roles(EGamePermission.UPDATE_GAME)
	async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGameDto) {
		return this.gamesService.update(id, dto);
	}

	@Delete(':id')
	@Roles(EGamePermission.DELETE_GAME)
	async remove(@Param('id', ParseIntPipe) id: number) {
		return this.gamesService.remove(id);
	}

	@Get()
	async list(@Query() query: GetGamesDto) {
		return this.gamesService.list(query);
	}

	@Get(':id')
	async getById(@Param('id', ParseIntPipe) id: number) {
		return this.gamesService.getById(id);
	}
}
