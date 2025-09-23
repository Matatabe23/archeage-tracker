import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

class CharactersListResponse {
	items: any[];
	total: number;
	page: number;
	limit: number;
}

export function GetCharactersDoc(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		ApiOperation({ summary: 'Список персонажей (фильтры, пагинация)' })(
			target,
			propertyKey,
			descriptor
		);
		ApiOkResponse({ description: 'Список персонажей', type: CharactersListResponse })(
			target,
			propertyKey,
			descriptor
		);
	};
}


