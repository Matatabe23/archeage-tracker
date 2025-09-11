import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { ErrorDto } from 'src/dto/error.dto';

export function CreateUserDoc(): MethodDecorator {
	return function (target, propertyKey, descriptor) {
		// Добавляем описание ручки
		ApiOperation({
			summary: 'Регистрация нового пользователя',
			description: 'Создаёт нового пользователя и отправляет письмо для подтверждения email'
		})(target, propertyKey, descriptor);

		ApiResponse({
			status: 201,
			description: 'Пользователь успешно зарегистрирован',
			type: CreateUserDto
		})(target, propertyKey, descriptor);

		ApiResponse({
			status: 400,
			description: 'Некорректные данные или пользователь уже существует',
			type: ErrorDto
		})(target, propertyKey, descriptor);

		ApiResponse({
			status: 500,
			description: 'Ошибка сервера',
			type: ErrorDto
		})(target, propertyKey, descriptor);
	};
}
