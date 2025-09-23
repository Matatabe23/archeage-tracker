import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateCharacterDto {
	@ApiProperty({ description: 'Имя персонажа', example: 'МойПерс' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	name: string;

	@ApiProperty({ description: 'ID пользователя-владельца', example: 1 })
	@IsInt()
	@Min(1)
	userId: number;

	@ApiProperty({ description: 'ID игры', example: 2 })
	@IsInt()
	@Min(1)
	gameId: number;

	@ApiProperty({ description: 'Класс/архетип', required: false })
	@IsString()
	@IsOptional()
	className?: string;

	@ApiProperty({ description: 'Уровень в виде строки', required: false, example: 'Lv. 55/Ancestral 20' })
	@IsString()
	@IsOptional()
	level?: string;

	@ApiProperty({ description: 'Описание персонажа', required: false })
	@IsString()
	@IsOptional()
	description?: string;

	@ApiProperty({ description: 'Доп. данные (JSON-строка)', required: false })
	@IsString()
	@IsOptional()
	metadata?: string;
}


