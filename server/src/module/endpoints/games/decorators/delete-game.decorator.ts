import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';

export function DeleteGameDoc(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiOperation({ summary: 'Удалить игру' })(target, propertyKey, descriptor);

		ApiResponse({ status: 200, description: 'Игра удалена', type: String })(
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


