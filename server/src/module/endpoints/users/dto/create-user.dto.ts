import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { MUST_BE_STRING } from 'src/const/errorConst';

export class CreateUserDto {
	@ApiProperty({
		description: 'Уникальное имя пользователя',
		example: 'qugor'
	})
	@IsNotEmpty()
	@IsString({ message: MUST_BE_STRING })
	name: string;

	@ApiProperty({
		description: 'Email пользователя',
		example: 'qugor@example.com'
	})
	@IsNotEmpty()
	@IsEmail({}, { message: 'Некорректный email' })
	email: string;

	@ApiProperty({
		description: 'Пароль пользователя (хэшируется при сохранении)',
		example: 'strongPassword123'
	})
	@IsNotEmpty()
	@IsString({ message: MUST_BE_STRING })
	@MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
	password: string;

	@ApiProperty({
		description: 'Имя',
		example: 'Иван',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	firstName?: string;

	@ApiProperty({
		description: 'Фамилия',
		example: 'Иванов',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	lastName?: string;

	@ApiProperty({
		description: 'Телефон',
		example: '+79998887766',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	phone?: string;
}
