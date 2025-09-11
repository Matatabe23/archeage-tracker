import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DBModule } from 'src/module/db/db.module';
import { MailModule } from 'src/module/service/mail/mail.module';

@Module({
	imports: [DBModule, MailModule],
	controllers: [UsersController],
	providers: [UsersService]
})
export class UsersModule {}
