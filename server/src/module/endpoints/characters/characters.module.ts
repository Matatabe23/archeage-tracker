import { Module } from '@nestjs/common';
import { DBModule } from 'src/module/db/db.module';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';

@Module({
	imports: [DBModule],
	controllers: [CharactersController],
	providers: [CharactersService]
})
export class CharactersModule {}


