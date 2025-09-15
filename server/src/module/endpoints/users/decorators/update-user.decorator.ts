import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ErrorDto } from 'src/dto/error.dto';

export function UpdateUserDoc(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		// Добавляем описание ручки
		ApiOperation({
			summary: 'Редактирование пользователя',
			description: 'Обновляет данные пользователя по ID'
		})(target, propertyKey, descriptor);

		ApiResponse({
			status: 200,
			description: 'Пользователь успешно обновлен',
			type: UpdateUserDto
		})(target, propertyKey, descriptor);

		ApiResponse({
			status: 400,
			description: 'Некорректные данные',
			type: ErrorDto
		})(target, propertyKey, descriptor);

		ApiResponse({
			status: 404,
			description: 'Пользователь не найден',
			type: ErrorDto
		})(target, propertyKey, descriptor);

		ApiResponse({
			status: 500,
			description: 'Ошибка сервера',
			type: ErrorDto
		})(target, propertyKey, descriptor);
	};
}

export function UpdateUserRolesDoc(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		// Добавляем описание ручки
		ApiOperation({
			summary: 'Назначение ролей пользователю',
			description: 'Назначает существующие роли пользователю по ID'
		})(target, propertyKey, descriptor);

		ApiResponse({
			status: 200,
			description: 'Роли успешно назначены пользователю',
			schema: {
				type: 'object',
				properties: {
					message: { type: 'string', example: 'Роли успешно назначены пользователю' },
					user: { type: 'object' },
					roles: { type: 'array', items: { type: 'object' } }
				}
			}
		})(target, propertyKey, descriptor);

		ApiResponse({
			status: 400,
			description: 'Некорректные данные или роли не найдены',
			type: ErrorDto
		})(target, propertyKey, descriptor);

		ApiResponse({
			status: 404,
			description: 'Пользователь не найден',
			type: ErrorDto
		})(target, propertyKey, descriptor);

		ApiResponse({
			status: 500,
			description: 'Ошибка сервера',
			type: ErrorDto
		})(target, propertyKey, descriptor);
	};
}
