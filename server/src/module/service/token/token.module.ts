import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TokenRepository } from './token.repository';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
	imports: [
		ConfigModule,
		JwtModule.register({
			secret: process.env.SECRET_KEY_ACCESS
		})
	],
	providers: [TokenRepository],
	exports: [TokenRepository]
})
export class TokenModule {}
