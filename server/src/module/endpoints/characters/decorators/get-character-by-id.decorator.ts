import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';

export function GetCharacterByIdDoc(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiOperation({ summary: 'Получить персонажа по id' })(target, propertyKey, descriptor);

		ApiResponse({ status: 200, description: 'Персонаж', type: Object })(
			target,
			propertyKey,
			descriptor
		);
		ApiResponse({ status: 404, description: 'Персонаж не найден', type: ErrorDto })(
			target,
			propertyKey,
			descriptor
		);
	};
}


