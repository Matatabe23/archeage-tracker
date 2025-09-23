import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { Characters } from 'src/module/db/models/characters/characters.repository';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { GetCharactersDto } from './dto/get-characters.dto';

@Injectable()
export class CharactersService {
	constructor(
		@InjectModel(Characters)
		private readonly charactersRepository: typeof Characters
	) {}

	async create(dto: CreateCharacterDto): Promise<Characters> {
		if (!dto.userId) {
			throw new BadRequestException('ID пользователя обязателен');
		}

		const exists = await this.charactersRepository.findOne({
			where: { name: dto.name, userId: dto.userId, gameId: dto.gameId }
		});
		if (exists)
			throw new BadRequestException(
				'Персонаж с таким именем уже существует у этого пользователя в этой игре'
			);

		const character = await this.charactersRepository.create({
			name: dto.name,
			userId: dto.userId,
			gameId: dto.gameId,
			className: dto.className ?? null,
			level: dto.level ?? null,
			description: dto.description ?? null,
			metadata: dto.metadata ?? null
		});

		return character.get({ plain: true }) as any;
	}

	async update(id: number, dto: UpdateCharacterDto): Promise<Characters> {
		const character = await this.charactersRepository.findByPk(id);
		if (!character) throw new NotFoundException('Персонаж не найден');

		if (dto.name || dto.userId || dto.gameId) {
			const conflict = await this.charactersRepository.findOne({
				where: {
					name: dto.name ?? character.name,
					userId: dto.userId ?? character.userId,
					gameId: dto.gameId ?? character.gameId,
					id: { [Op.ne]: id } as any
				}
			});
			if (conflict)
				throw new BadRequestException(
					'Такой персонаж уже существует у этого пользователя в этой игре'
				);
		}

		Object.assign(character, dto);
		await character.save();
		return character.get({ plain: true }) as any;
	}

	async remove(id: number): Promise<{ message: string }> {
		const character = await this.charactersRepository.findByPk(id);
		if (!character) throw new NotFoundException('Персонаж не найден');
		await character.destroy();
		return { message: 'Персонаж удалён' };
	}

	async getById(id: number): Promise<Characters> {
		const character = await this.charactersRepository.findByPk(id);
		if (!character) throw new NotFoundException('Персонаж не найден');
		return character.get({ plain: true }) as any;
	}

	async list(
		query: GetCharactersDto
	): Promise<{ items: Characters[]; total: number; page: number; limit: number }> {
		const page = query.page ?? 1;
		const limit = query.limit ?? 20;
		const offset = (page - 1) * limit;

		const where: WhereOptions = {};
		if (query.search) {
			Object.assign(where, {
				[Op.or]: [
					{ name: { [Op.like]: `%${query.search}%` } },
					{ className: { [Op.like]: `%${query.search}%` } },
					{ level: { [Op.like]: `%${query.search}%` } }
				]
			});
		}
		if (query.userId) Object.assign(where, { userId: query.userId });
		if (query.gameId) Object.assign(where, { gameId: query.gameId });

		const { rows, count } = await this.charactersRepository.findAndCountAll({
			where,
			offset,
			limit,
			order: [['id', 'DESC']]
		});

		const items = rows.map((r) => r.get({ plain: true })) as any;
		return { items, total: count, page, limit };
	}
}
