import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class TokenRepository {
	constructor(private readonly jwtService: JwtService) {}

	/**
	 * Генерация access токена
	 * @param payload - данные, которые нужно зашить в токен
	 * @param expiresIn - время жизни токена (по умолчанию 15m)
	 * @param secret - секрет для подписи (если не указан, берётся дефолтный)
	 */
	generateAccessToken<T extends object>(
		payload: T,
		expiresIn: string | number = '15m',
		secret?: string
	): string {
		const options: JwtSignOptions = {
			expiresIn
		};
		if (secret) {
			options.secret = secret;
		}
		return this.jwtService.sign(payload, options);
	}

	/**
	 * Генерация refresh токена
	 * @param payload - данные, которые нужно зашить в токен
	 * @param expiresIn - время жизни токена (по умолчанию 7d)
	 * @param secret - секрет для подписи (если не указан, берётся дефолтный)
	 */
	generateRefreshToken<T extends object>(
		payload: T,
		expiresIn: string | number = '7d',
		secret?: string
	): string {
		const options: JwtSignOptions = {
			expiresIn
		};
		if (secret) {
			options.secret = secret;
		}
		return this.jwtService.sign(payload, options);
	}

	/**
	 * Проверка токена
	 * @param token - строка токена
	 * @param secret - секрет для верификации (если отличается от дефолтного)
	 */
	verifyToken<T extends object = any>(token: string, secret?: string): T {
		return this.jwtService.verify<T>(token, secret ? { secret } : {});
	}
}
