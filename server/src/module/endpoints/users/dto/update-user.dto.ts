import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsArray, IsNumber, IsBoolean, IsDateString } from 'class-validator';
import { MUST_BE_STRING } from 'src/const/errorConst';

export class UpdateUserDto {
	@ApiProperty({
		description: 'Уникальное имя пользователя',
		example: 'qugor',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	name?: string;

	@ApiProperty({
		description: 'Email пользователя',
		example: 'qugor@example.com',
		required: false
	})
	@IsOptional()
	@IsEmail({}, { message: 'Некорректный email' })
	email?: string;

	@ApiProperty({
		description: 'URL аватара пользователя',
		example: 'https://example.com/avatar.jpg',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	avatarUrl?: string;

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

	@ApiProperty({
		description: 'Дата рождения',
		example: '1990-01-01',
		required: false
	})
	@IsOptional()
	@IsDateString()
	dateOfBirth?: string;

	@ApiProperty({
		description: 'Страна',
		example: 'Россия',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	country?: string;

	@ApiProperty({
		description: 'Город',
		example: 'Москва',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	city?: string;

	@ApiProperty({
		description: 'Часовой пояс',
		example: 'Europe/Moscow',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	timezone?: string;

	@ApiProperty({
		description: 'Предпочитаемый язык',
		example: 'ru',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	language?: string;

	@ApiProperty({
		description: 'Активен ли пользователь',
		example: true,
		required: false
	})
	@IsOptional()
	@IsBoolean()
	isActive?: boolean;

	@ApiProperty({
		description: 'Подтвержден ли email',
		example: true,
		required: false
	})
	@IsOptional()
	@IsBoolean()
	isEmailVerified?: boolean;

	@ApiProperty({
		description: 'JSON строка с настройками пользователя',
		example: '{"theme": "dark", "notifications": true}',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	preferences?: string;

	@ApiProperty({
		description: 'JSON строка с дополнительными данными пользователя',
		example: '{"lastLoginIP": "192.168.1.1"}',
		required: false
	})
	@IsOptional()
	@IsString({ message: MUST_BE_STRING })
	metadata?: string;
}

export class UpdateUserRolesDto {
	@ApiProperty({
		description: 'Массив ID ролей для назначения пользователю',
		example: [1, 2, 3],
		type: [Number],
		required: false
	})
	@IsOptional()
	@IsArray()
	@IsNumber({}, { each: true })
	roleIds?: number[];
}
