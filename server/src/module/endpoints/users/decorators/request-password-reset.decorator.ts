import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { RequestPasswordResetDto } from '../dto/request-password-reset.dto';

export function RequestPasswordResetDoc() {
	return applyDecorators(
		ApiOperation({
			summary: 'Запрос восстановления пароля',
			description: 'Отправляет ссылку для восстановления пароля на email пользователя'
		}),
		ApiBody({ type: RequestPasswordResetDto }),
		ApiResponse({
			status: 200,
			description: 'Ссылка для восстановления пароля отправлена на email',
			schema: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'Ссылка для восстановления пароля отправлена на ваш email'
					}
				}
			}
		}),
		ApiResponse({
			status: 400,
			description: 'Пользователь не найден',
			schema: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'Пользователь с указанным email или именем не найден'
					}
				}
			}
		}),
		ApiResponse({
			status: 500,
			description: 'Внутренняя ошибка сервера'
		})
	);
}
