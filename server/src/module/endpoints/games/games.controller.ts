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
import { CreateGameDoc } from './decorators/create-game.decorator';
import { UpdateGameDoc } from './decorators/update-game.decorator';
import { DeleteGameDoc } from './decorators/delete-game.decorator';
import { GetGamesDoc } from './decorators/get-games.decorator';
import { GetGameByIdDoc } from './decorators/get-game-by-id.decorator';

@Controller('games')
@ApiTags('Игры')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, RolesGuard)
export class GamesController {
	constructor(private readonly gamesService: GamesService) {}

	@Post()
	@CreateGameDoc()
	@Roles(EGamePermission.CREATE_GAME)
	async create(@Body() dto: CreateGameDto) {
		return this.gamesService.create(dto);
	}

	@Patch(':id')
	@UpdateGameDoc()
	@Roles(EGamePermission.UPDATE_GAME)
	async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGameDto) {
		return this.gamesService.update(id, dto);
	}

	@Delete(':id')
	@DeleteGameDoc()
	@Roles(EGamePermission.DELETE_GAME)
	async remove(@Param('id', ParseIntPipe) id: number) {
		return this.gamesService.remove(id);
	}

	@Get()
	@GetGamesDoc()
	async list(@Query() query: GetGamesDto) {
		return this.gamesService.list(query);
	}

	@Get(':id')
	@GetGameByIdDoc()
	async getById(@Param('id', ParseIntPipe) id: number) {
		return this.gamesService.getById(id);
	}
}
