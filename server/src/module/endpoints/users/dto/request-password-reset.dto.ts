import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { MUST_BE_STRING } from 'src/const/errorConst';

export class RequestPasswordResetDto {
	@ApiProperty({
		description: 'Email или имя пользователя',
		example: 'qugor@example.com или qugor'
	})
	@IsNotEmpty()
	@IsString({ message: MUST_BE_STRING })
	loginOrEmail: string;

	@ApiProperty({
		description: 'URL для перенаправления после восстановления пароля',
		example: 'https://example.com/reset-password',
		required: false
	})
	@IsOptional()
	@IsUrl({}, { message: 'Некорректный URL' })
	resetUrl?: string;
}
