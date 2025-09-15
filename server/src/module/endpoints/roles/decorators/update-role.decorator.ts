import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

export function UpdateRoleDoc(): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    ApiOperation({ summary: 'Редактировать роль' })(target, propertyKey, descriptor);

    ApiResponse({ status: 200, description: 'Роль обновлена', type: UpdateRoleDto })(
      target,
      propertyKey,
      descriptor
    );
    ApiResponse({ status: 404, description: 'Роль не найдена', type: ErrorDto })(
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


