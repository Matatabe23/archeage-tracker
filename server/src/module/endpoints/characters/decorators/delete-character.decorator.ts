import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';

export function DeleteCharacterDoc(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiOperation({ summary: 'Удалить персонажа' })(target, propertyKey, descriptor);

		ApiResponse({ status: 200, description: 'Персонаж удалён', type: String })(
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


