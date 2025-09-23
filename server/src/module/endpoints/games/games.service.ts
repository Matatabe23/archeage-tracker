import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { Games } from 'src/module/db/models/games/games.repository';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GetGamesDto } from './dto/get-games.dto';

@Injectable()
export class GamesService {
	constructor(
		@InjectModel(Games)
		private readonly gamesRepository: typeof Games
	) {}

	async create(dto: CreateGameDto): Promise<Games> {
		const exists = await this.gamesRepository.findOne({ where: { name: dto.name } });
		if (exists) throw new BadRequestException('Игра с таким названием уже существует');

		const game = await this.gamesRepository.create({
			name: dto.name,
			shortDescription: dto.shortDescription ?? null,
			description: dto.description ?? null,
			iconPath: dto.iconPath ?? null,
			officialSiteUrl: dto.officialSiteUrl ?? null,
			genre: dto.genre ?? null,
			developer: dto.developer ?? null,
			publisher: dto.publisher ?? null,
			releaseDate: dto.releaseDate ?? null,
			platforms: dto.platforms ?? null,
			rating: dto.rating ?? null,
			isActive: dto.isActive ?? true,
			tags: dto.tags ?? null,
			metadata: dto.metadata ?? null
		});

		return game.get({ plain: true }) as any;
	}

	async update(id: number, dto: UpdateGameDto): Promise<Games> {
		const game = await this.gamesRepository.findByPk(id);
		if (!game) throw new NotFoundException('Игра не найдена');

		if (dto.name) {
			const conflict = await this.gamesRepository.findOne({
				where: { name: dto.name, id: { [Op.ne]: id } as any }
			});
			if (conflict) throw new BadRequestException('Название уже занято');
		}

		Object.assign(game, dto);
		await game.save();
		return game.get({ plain: true }) as any;
	}

	async remove(id: number): Promise<{ message: string }> {
		const game = await this.gamesRepository.findByPk(id);
		if (!game) throw new NotFoundException('Игра не найдена');
		await game.destroy();
		return { message: 'Игра удалена' };
	}

	async getById(id: number): Promise<Games> {
		const game = await this.gamesRepository.findByPk(id);
		if (!game) throw new NotFoundException('Игра не найдена');
		return game.get({ plain: true }) as any;
	}

	async list(
		query: GetGamesDto
	): Promise<{ items: Games[]; total: number; page: number; limit: number }> {
		const page = query.page ?? 1;
		const limit = query.limit ?? 20;
		const offset = (page - 1) * limit;

		const where: WhereOptions = {};
		if (query.search) {
			Object.assign(where, {
				[Op.or]: [
					{ name: { [Op.like]: `%${query.search}%` } },
					{ shortDescription: { [Op.like]: `%${query.search}%` } },
					{ description: { [Op.like]: `%${query.search}%` } }
				]
			});
		}
		if (query.genre) Object.assign(where, { genre: { [Op.like]: `%${query.genre}%` } });
		if (query.platform) {
			Object.assign(where, { platforms: { [Op.like]: `%${query.platform}%` } });
		}
		if (query.isActive != null) Object.assign(where, { isActive: query.isActive });

		const { rows, count } = await this.gamesRepository.findAndCountAll({
			where,
			offset,
			limit,
			order: [
				['rating', 'DESC'],
				['id', 'ASC']
			]
		});

		const items = rows.map((r) => r.get({ plain: true })) as any;
		return { items, total: count, page, limit };
	}
}
