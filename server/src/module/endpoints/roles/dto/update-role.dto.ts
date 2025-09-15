import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateRoleDto {
  @ApiPropertyOptional({ description: 'Имя роли на русском', example: 'Модератор' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  nameRu?: string;

  @ApiPropertyOptional({ description: 'Имя роли на английском', example: 'moderator' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  nameEn?: string;

  @ApiPropertyOptional({ description: 'Список прав, строка или CSV', example: 'users.read,users.ban' })
  @IsString()
  @IsOptional()
  permissions?: string;

  @ApiPropertyOptional({ description: 'Приоритет роли (выше — значимее)', example: 50 })
  @IsInt()
  @Min(0)
  @IsOptional()
  priority?: number;

  @ApiPropertyOptional({ description: 'Цвет роли', example: '#00ff00' })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({ description: 'Описание роли', example: 'Доступ к модерации' })
  @IsString()
  @IsOptional()
  description?: string;
}


