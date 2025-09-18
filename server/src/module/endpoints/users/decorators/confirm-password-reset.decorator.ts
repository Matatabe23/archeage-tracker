import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ConfirmPasswordResetDto } from '../dto/confirm-password-reset.dto';

export function ConfirmPasswordResetDoc() {
	return applyDecorators(
		ApiOperation({
			summary: 'Подтверждение восстановления пароля',
			description: 'Устанавливает новый пароль по токену восстановления'
		}),
		ApiBody({ type: ConfirmPasswordResetDto }),
		ApiResponse({
			status: 200,
			description: 'Пароль успешно изменён',
			schema: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'Пароль успешно изменён'
					}
				}
			}
		}),
		ApiResponse({
			status: 400,
			description: 'Неверный или истёкший токен',
			schema: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'Неверный или истёкший токен восстановления'
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
