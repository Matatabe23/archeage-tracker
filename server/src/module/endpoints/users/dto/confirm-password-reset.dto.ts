import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { MUST_BE_STRING } from 'src/const/errorConst';

export class ConfirmPasswordResetDto {
	@ApiProperty({
		description: 'Токен восстановления пароля',
		example: 'abc123def456ghi789'
	})
	@IsNotEmpty()
	@IsString({ message: MUST_BE_STRING })
	token: string;

	@ApiProperty({
		description: 'Новый пароль',
		example: 'newStrongPassword123'
	})
	@IsNotEmpty()
	@IsString({ message: MUST_BE_STRING })
	@MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
	newPassword: string;
}
