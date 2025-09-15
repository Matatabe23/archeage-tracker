import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorDto } from 'src/dto/error.dto';

export function DeleteRoleDoc(): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    ApiOperation({ summary: 'Удалить роль' })(target, propertyKey, descriptor);

    ApiResponse({ status: 200, description: 'Роль удалена' })(
      target,
      propertyKey,
      descriptor
    );
    ApiResponse({ status: 404, description: 'Роль не найдена', type: ErrorDto })(
      target,
      propertyKey,
      descriptor
    );
  };
}


