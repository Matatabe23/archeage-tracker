import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { Characters } from 'src/module/db/models/characters/characters.repository';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class CharacterOwnershipGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		@InjectModel(Characters)
		private readonly charactersRepository: typeof Characters
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const user = request.user;

		if (!user) {
			throw new ForbiddenException('Пользователь не авторизован');
		}

		// Проверяем, есть ли у пользователя права на эту ручку
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		]);

		// Если есть права на ручку - разрешаем доступ ко всем персонажам
		if (requiredRoles && requiredRoles.length > 0) {
			const hasRequiredRole = requiredRoles.some((role) => user.roles?.includes(role));
			if (hasRequiredRole) {
				return true; // Пользователь с правами может работать с любыми персонажами
			}
		}

		// Если нет прав на ручку - проверяем владение персонажем
		const characterId = request.params.id;
		if (!characterId) {
			return true; // Если нет ID в параметрах (например, для создания), пропускаем
		}

		const character = await this.charactersRepository.findByPk(characterId);
		if (!character) {
			return true; // Если персонаж не найден, пропускаем (вернёт 404 в сервисе)
		}

		// Проверяем, что персонаж принадлежит текущему пользователю
		if (character.userId !== user.sub) {
			throw new ForbiddenException('Вы можете работать только со своими персонажами');
		}

		return true;
	}
}
