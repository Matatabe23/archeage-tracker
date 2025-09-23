import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';

export function UpdateCharacterDoc(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiOperation({ summary: 'Обновить персонажа' })(target, propertyKey, descriptor);

		ApiResponse({ status: 200, description: 'Персонаж обновлён', type: UpdateCharacterDto })(
			target,
			propertyKey,
			descriptor
		);
		ApiResponse({ status: 404, description: 'Персонаж не найден', type: ErrorDto })(
			target,
			propertyKey,
			descriptor
		);
		ApiResponse({ status: 400, description: 'Ошибка валидации/конфликт', type: ErrorDto })(
			target,
			propertyKey,
			descriptor
		);
	};
}


