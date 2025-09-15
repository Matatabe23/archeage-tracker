// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		// роли, которые нужны для доступа к ручке
		const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		]);
		if (!requiredRoles) {
			return true; // если роли не указаны — пропускаем всех
		}

		const request = context.switchToHttp().getRequest();
		const user = request.user; // обычно сюда кладёт Passport или JwtStrategy

		console.log(user);

		return requiredRoles.some((role) => user.roles?.includes(role));
	}
}
