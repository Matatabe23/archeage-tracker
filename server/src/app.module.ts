import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DBModule } from './module/db/db.module';

import { UsersModule } from './module/endpoints/users/users.module';

import { S3Module } from './module/service/s3/s3.module';
import { FileModule } from './module/service/files/files.module';

import { FilesModule } from './module/endpoints/files/files.module';
import { RolesModule } from './module/endpoints/roles/roles.module';

import { WebSocketModule } from './module/websocket/websocket.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TokenModule } from './module/service/token/token.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			isGlobal: true
		}),
		EventEmitterModule.forRoot(),
		DBModule,

		WebSocketModule,

		UsersModule,
		RolesModule,
		FilesModule,

		S3Module,
		FileModule,
		TokenModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
