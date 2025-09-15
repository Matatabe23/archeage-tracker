import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetRolesDto {
  @ApiPropertyOptional({ description: 'Фильтр по имени (RU или EN)', example: 'admin' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ description: 'Минимальный приоритет', example: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  minPriority?: number;

  @ApiPropertyOptional({ description: 'Максимальный приоритет', example: 1000 })
  @IsInt()
  @Min(0)
  @IsOptional()
  maxPriority?: number;

  @ApiPropertyOptional({ description: 'Страница', example: 1, default: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Размер страницы', example: 20, default: 20 })
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 20;
}


