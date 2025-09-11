import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { MUST_BE_STRING } from 'src/const/errorConst';

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
}
