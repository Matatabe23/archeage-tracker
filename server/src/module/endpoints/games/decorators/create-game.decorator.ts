import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';
import { CreateGameDto } from '../dto/create-game.dto';

export function CreateGameDoc(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiOperation({ summary: 'Создать игру' })(target, propertyKey, descriptor);

		ApiResponse({ status: 201, description: 'Игра создана', type: CreateGameDto })(
			target,
			propertyKey,
			descriptor
		);
		ApiResponse({ status: 400, description: 'Ошибка валидации/конфликт', type: ErrorDto })(
			target,
			propertyKey,
			descriptor
		);
		ApiResponse({ status: 500, description: 'Ошибка сервера', type: ErrorDto })(
			target,
			propertyKey,
			descriptor
		);
	};
}


