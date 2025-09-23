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
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { GetCharactersDto } from './dto/get-characters.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ECharacterPermission } from 'src/types/permissions/characters';
import { CreateCharacterDoc } from './decorators/create-character.decorator';
import { UpdateCharacterDoc } from './decorators/update-character.decorator';
import { DeleteCharacterDoc } from './decorators/delete-character.decorator';
import { GetCharactersDoc } from './decorators/get-characters.decorator';
import { GetCharacterByIdDoc } from './decorators/get-character-by-id.decorator';

@Controller('characters')
@ApiTags('Персонажи')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, RolesGuard)
export class CharactersController {
	constructor(private readonly charactersService: CharactersService) {}

	@Post()
	@CreateCharacterDoc()
	async create(@Body() dto: CreateCharacterDto) {
		return this.charactersService.create(dto);
	}

	@Patch(':id')
	@UpdateCharacterDoc()
	async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCharacterDto) {
		return this.charactersService.update(id, dto);
	}

	@Delete(':id')
	@DeleteCharacterDoc()
	async remove(@Param('id', ParseIntPipe) id: number) {
		return this.charactersService.remove(id);
	}

	@Get()
	@GetCharactersDoc()
	@Roles(ECharacterPermission.GET_CHARACTERS)
	async list(@Query() query: GetCharactersDto) {
		return this.charactersService.list(query);
	}

	@Get(':id')
	@GetCharacterByIdDoc()
	async getById(@Param('id', ParseIntPipe) id: number) {
		return this.charactersService.getById(id);
	}
}
