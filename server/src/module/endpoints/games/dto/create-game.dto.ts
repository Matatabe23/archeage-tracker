import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsDateString,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength
} from 'class-validator';

export class CreateGameDto {
	@ApiProperty({ description: 'Название игры', example: 'ArcheAge' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	name: string;

	@ApiProperty({ description: 'Краткое описание', required: false })
	@IsString()
	@IsOptional()
	shortDescription?: string;

	@ApiProperty({ description: 'Полное описание', required: false })
	@IsString()
	@IsOptional()
	description?: string;

	@ApiProperty({ description: 'Путь к иконке (часть ссылки)', required: false })
	@IsString()
	@IsOptional()
	iconPath?: string;

	@ApiProperty({ description: 'Ссылка на официальный сайт', required: false })
	@IsString()
	@IsOptional()
	officialSiteUrl?: string;

	@ApiProperty({ description: 'Жанры через запятую', required: false })
	@IsString()
	@IsOptional()
	genre?: string;

	@ApiProperty({ description: 'Разработчик', required: false })
	@IsString()
	@IsOptional()
	developer?: string;

	@ApiProperty({ description: 'Издатель', required: false })
	@IsString()
	@IsOptional()
	publisher?: string;

	@ApiProperty({ description: 'Дата выхода', required: false })
	@IsDateString()
	@IsOptional()
	releaseDate?: string;

	@ApiProperty({ description: 'Платформы через запятую', required: false })
	@IsString()
	@IsOptional()
	platforms?: string;

	@ApiProperty({ description: 'Рейтинг 0-10', required: false, example: 8.7 })
	@IsNumber()
	@IsOptional()
	rating?: number;

	@ApiProperty({ description: 'Активна ли игра', required: false, default: true })
	@IsBoolean()
	@IsOptional()
	isActive?: boolean;

	@ApiProperty({ description: 'Теги через запятую', required: false })
	@IsString()
	@IsOptional()
	tags?: string;

	@ApiProperty({ description: 'Доп. данные (JSON-строка)', required: false })
	@IsString()
	@IsOptional()
	metadata?: string;
}
