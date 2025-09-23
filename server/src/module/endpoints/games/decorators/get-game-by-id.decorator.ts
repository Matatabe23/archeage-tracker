import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';

export function GetGameByIdDoc(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiOperation({ summary: 'Получить игру по id' })(target, propertyKey, descriptor);

		ApiResponse({ status: 200, description: 'Игра', type: Object })(
			target,
			propertyKey,
			descriptor
		);
		ApiResponse({ status: 404, description: 'Игра не найдена', type: ErrorDto })(
			target,
			propertyKey,
			descriptor
		);
	};
}


