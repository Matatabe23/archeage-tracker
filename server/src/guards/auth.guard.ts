// src/guards/auth.guard.ts
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
	ForbiddenException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModuleRef } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
	private jwtService: JwtService;

	constructor(private readonly moduleRef: ModuleRef) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		// получаем JwtService вручную при первом вызове
		if (!this.jwtService) {
			this.jwtService = this.moduleRef.get(JwtService, { strict: false });
		}

		const request = context.switchToHttp().getRequest<Request>();
		const authHeader = request.headers.authorization;

		if (!authHeader) {
			throw new UnauthorizedException('Токен не найден');
		}

		const [bearer, token] = authHeader.split(' ');

		if (bearer !== 'Bearer' || !token) {
			throw new UnauthorizedException('Неверный формат токена');
		}

		try {
			const decoded = await this.jwtService.verifyAsync(token);

			if (!decoded.isTeamMember) {
				throw new ForbiddenException('Нет прав для доступа');
			}

			(request as any).user = decoded;
			return true;
		} catch (error) {
			throw new UnauthorizedException('Токен недействителен или просрочен');
		}
	}
}
