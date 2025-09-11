import { Module } from '@nestjs/common';
import { DBModule } from 'src/module/db/db.module';
import { AuthGuard } from 'src/guards/auth.guard';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
	imports: [DBModule],
	controllers: [FilesController],
	providers: [FilesService, AuthGuard]
})
export class FilesModule {}
