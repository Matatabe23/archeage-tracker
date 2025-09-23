import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetCharactersDto {
	@ApiProperty({ description: 'Поиск по имени/классу/уровню', required: false })
	@IsString()
	@IsOptional()
	search?: string;

	@ApiProperty({ description: 'Фильтр по пользователю', required: false })
	@IsInt()
	@Min(1)
	@IsOptional()
	userId?: number;

	@ApiProperty({ description: 'Фильтр по игре', required: false })
	@IsInt()
	@Min(1)
	@IsOptional()
	gameId?: number;

	@ApiProperty({ description: 'Страница', required: false, default: 1 })
	@IsInt()
	@Min(1)
	@IsOptional()
	page?: number;

	@ApiProperty({ description: 'Лимит', required: false, default: 20 })
	@IsInt()
	@Min(1)
	@Max(100)
	@IsOptional()
	limit?: number;
}


