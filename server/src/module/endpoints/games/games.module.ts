import { Module } from '@nestjs/common';
import { DBModule } from 'src/module/db/db.module';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';

@Module({
	imports: [DBModule],
	controllers: [GamesController],
	providers: [GamesService]
})
export class GamesModule {}
