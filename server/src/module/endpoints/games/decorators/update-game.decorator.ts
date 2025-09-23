import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';
import { UpdateGameDto } from '../dto/update-game.dto';

export function UpdateGameDoc(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiOperation({ summary: 'Обновить игру' })(target, propertyKey, descriptor);

		ApiResponse({ status: 200, description: 'Игра обновлена', type: UpdateGameDto })(
			target,
			propertyKey,
			descriptor
		);
		ApiResponse({ status: 404, description: 'Игра не найдена', type: ErrorDto })(
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


