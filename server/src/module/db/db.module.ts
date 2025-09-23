import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { usersDBList } from './models/users';
import { gamesDBList } from './models/games';

// Импортируем модели

const dbList = [...usersDBList, ...gamesDBList];

@Module({
	imports: [
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				dialect: 'mysql',
				host: configService.get('dbHost'),
				port: configService.get('dbPort'),
				username: configService.get('dbUser'),
				password: configService.get('dbPassword'),
				database: configService.get('dbName'),
				models: dbList,
				autoLoadModels: true,
				synchronize: true
			}),
			inject: [ConfigService]
		}),
		SequelizeModule.forFeature(dbList)
	],
	exports: [SequelizeModule]
})
export class DBModule {}
