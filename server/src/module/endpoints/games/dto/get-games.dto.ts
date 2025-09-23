import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetGamesDto {
	@ApiProperty({ description: 'Поиск по названию/описанию', required: false })
	@IsString()
	@IsOptional()
	search?: string;

	@ApiProperty({ description: 'Фильтр по жанру (like)', required: false })
	@IsString()
	@IsOptional()
	genre?: string;

	@ApiProperty({ description: 'Фильтр по платформе (like)', required: false })
	@IsString()
	@IsOptional()
	platform?: string;

	@ApiProperty({ description: 'Только активные', required: false })
	@IsBoolean()
	@IsOptional()
	isActive?: boolean;

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
