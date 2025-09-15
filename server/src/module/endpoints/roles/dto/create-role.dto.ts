import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateRoleDto {
	@ApiProperty({ description: 'Имя роли на русском', example: 'Администратор' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	nameRu: string;

	@ApiProperty({ description: 'Имя роли на английском', example: 'admin' })
	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	nameEn: string;

	@ApiProperty({ description: 'Список прав, строка или CSV', example: 'role_create,ban_user' })
	@IsString()
	@IsOptional()
	permissions?: string;

	@ApiProperty({ description: 'Приоритет роли (выше — значимее)', example: 100, default: 0 })
	@IsInt()
	@Min(0)
	@IsOptional()
	priority?: number;

	@ApiProperty({ description: 'Цвет роли', example: '#ff0000', default: '#fff' })
	@IsString()
	@IsOptional()
	color?: string;

	@ApiProperty({ description: 'Описание роли', example: 'Имеет полный доступ' })
	@IsString()
	@IsOptional()
	description?: string;
}
