import { Module } from '@nestjs/common';
import { DBModule } from 'src/module/db/db.module';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

@Module({
  imports: [DBModule],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}


