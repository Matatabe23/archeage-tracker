import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';
import { CreateCharacterDto } from '../dto/create-character.dto';

export function CreateCharacterDoc(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiOperation({ summary: 'Создать персонажа' })(target, propertyKey, descriptor);

		ApiResponse({ status: 201, description: 'Персонаж создан', type: CreateCharacterDto })(
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


