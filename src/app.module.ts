import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MusicModule } from './music/music.module';
import { PaymentsModule } from './payments/payments.module';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MusicModule,
    PaymentsModule,
    ChatModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}