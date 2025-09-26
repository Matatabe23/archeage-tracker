import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, WhereOptions } from 'sequelize';
import { Roles } from 'src/module/db/models/users/roles.repository';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRolesDto } from './dto/get-roles.dto';
import { PERMISSIONS } from 'src/const/permissions';

@Injectable()
export class RolesService {
	constructor(
		@InjectModel(Roles)
		private readonly rolesRepository: typeof Roles
	) {}

	async onModuleInit() {
		const count = await this.rolesRepository.count();
		if (count === 0) {
			// Собираем все permissions из объекта
			const allPermissions = Object.values(PERMISSIONS)
				.flat() // объединяем массивы
				.map((p) => p.permission) // берём только permission
				.join(','); // превращаем в строку через запятую

			await this.rolesRepository.create({
				nameRu: 'Администратор',
				nameEn: 'Admin',
				permissions: allPermissions,
				priority: 999, // максимально высокий приоритет
				color: '#ff0000',
				description: 'Роль с максимальными правами'
			});

			console.log('✅ Роль Админ создана');
		}
	}

	async create(dto: CreateRoleDto): Promise<Roles> {
		const exists = await this.rolesRepository.findOne({
			where: {
				[Op.or]: [{ nameEn: dto.nameEn }, { nameRu: dto.nameRu }]
			}
		});
		if (exists) throw new BadRequestException('Роль с таким именем уже существует');

		const role = await this.rolesRepository.create({
			nameEn: dto.nameEn,
			nameRu: dto.nameRu,
			permissions: dto.permissions ?? '',
			priority: dto.priority ?? 0,
			color: dto.color ?? '#fff',
			description: dto.description ?? null
		});
		return role.get({ plain: true }) as any;
	}

	async update(id: number, dto: UpdateRoleDto): Promise<Roles> {
		const role = await this.rolesRepository.findByPk(id);
		if (!role) throw new NotFoundException('Роль не найдена');

		if (dto.nameEn || dto.nameRu) {
			const conflict = await this.rolesRepository.findOne({
				where: {
					[Op.or]: [
						dto.nameEn ? { nameEn: dto.nameEn } : undefined,
						dto.nameRu ? { nameRu: dto.nameRu } : undefined
					].filter(Boolean) as any,
					id: { [Op.ne]: id }
				} as any
			});
			if (conflict) throw new BadRequestException('Имя роли уже занято');
		}

		Object.assign(role, dto);
		await role.save();
		return role.get({ plain: true }) as any;
	}

	async remove(id: number): Promise<{ message: string }> {
		const role = await this.rolesRepository.findByPk(id);
		if (!role) throw new NotFoundException('Роль не найдена');
		await role.destroy();
		return { message: 'Роль удалена' };
	}

	async list(
		query: GetRolesDto
	): Promise<{ items: Roles[]; total: number; page: number; limit: number }> {
		const page = query.page ?? 1;
		const limit = query.limit ?? 20;
		const offset = (page - 1) * limit;

		const where: WhereOptions = {};
		if (query.search) {
			Object.assign(where, {
				[Op.or]: [
					{ nameEn: { [Op.like]: `%${query.search}%` } },
					{ nameRu: { [Op.like]: `%${query.search}%` } }
				]
			});
		}
		if (query.minPriority != null) {
			Object.assign(where, {
				priority: { ...(where as any).priority, [Op.gte]: query.minPriority }
			});
		}
		if (query.maxPriority != null) {
			Object.assign(where, {
				priority: { ...(where as any).priority, [Op.lte]: query.maxPriority }
			});
		}

		const { rows, count } = await this.rolesRepository.findAndCountAll({
			where,
			offset,
			limit,
			order: [
				['priority', 'DESC'],
				['id', 'ASC']
			]
		});

		const items = rows.map((r) => r.get({ plain: true })) as any;
		return { items, total: count, page, limit };
	}
}
