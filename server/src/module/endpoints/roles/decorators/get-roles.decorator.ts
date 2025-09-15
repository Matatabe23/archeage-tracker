import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetRolesDto } from '../dto/get-roles.dto';

class RolesListResponse {
  items: any[];
  total: number;
  page: number;
  limit: number;
}

export function GetRolesDoc(): MethodDecorator {
  return function (target, propertyKey, descriptor) {
    ApiOperation({ summary: 'Список ролей (с фильтрами и пагинацией)' })(
      target,
      propertyKey,
      descriptor
    );
    ApiOkResponse({ description: 'Список ролей', type: RolesListResponse })(
      target,
      propertyKey,
      descriptor
    );
  };
}


