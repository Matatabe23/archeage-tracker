import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MUST_BE_STRING } from 'src/const/errorConst';

export class DeviceInfoDto {
	@ApiProperty({ example: 'MacBook Pro 16' })
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	deviceName?: string;

	@ApiProperty({ example: 'desktop' })
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	deviceType?: string;

	@ApiProperty({
		example:
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	userAgent?: string;

	@ApiProperty({ example: '000.000.0.00' })
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	ipAddress?: string;
}

export class LoginUserDto {
	@ApiProperty({
		description: 'Email или имя пользователя для входа',
		example: 'qugor или qugor@example.com'
	})
	@IsNotEmpty()
	@IsString({ message: MUST_BE_STRING })
	loginOrEmail: string;

	@ApiProperty({
		description: 'Пароль пользователя',
		example: 'strongPassword123'
	})
	@IsNotEmpty()
	@IsString({ message: MUST_BE_STRING })
	password: string;

	@ApiProperty({
		description: 'Данные устройства',
		type: DeviceInfoDto,
		required: false
	})
	@IsOptional()
	@ValidateNested()
	@Type(() => DeviceInfoDto) // важно для преобразования JSON в объект
	deviceInfo?: DeviceInfoDto;
}
