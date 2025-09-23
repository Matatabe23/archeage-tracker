import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { GetGamesDto } from '../dto/get-games.dto';

class GamesListResponse {
	items: any[];
	total: number;
	page: number;
	limit: number;
}

export function GetGamesDoc(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiOperation({ summary: 'Список игр (фильтры, пагинация)' })(target, propertyKey, descriptor);
		ApiOkResponse({ description: 'Список игр', type: GamesListResponse })(
			target,
			propertyKey,
			descriptor
		);
	};
}


