import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';
import { CreateRoleDto } from '../dto/create-role.dto';

export function CreateRoleDoc(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiOperation({ summary: 'Создать роль' })(target, propertyKey, descriptor);

		ApiResponse({ status: 201, description: 'Роль создана', type: CreateRoleDto })(
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
